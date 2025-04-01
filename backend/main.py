import ssl
import asyncio
import tempfile
import logging
import os
import gc
import subprocess
from concurrent.futures import ThreadPoolExecutor
from whisper_model import WhisperEngine
import soundfile as sf
from fastapi import (
    FastAPI,
    WebSocket,
    WebSocketDisconnect,
)
import uuid
from fastapi.middleware.cors import CORSMiddleware
import json
import time
from starlette.websockets import WebSocketState
from extract_audio import extract_audio_from_buffer

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Bypass SSL verification if needed
ssl._create_default_https_context = ssl._create_unverified_context
app = FastAPI()

# Dictionary to store chunks for each session
active_sessions = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a single whisper instance with a smaller, faster model
whisper_engine = WhisperEngine("tiny")

async def transcribe_chunk(chunk_path: str, chunk_id: int):
    logger.info(f"Starting transcription of chunk {chunk_id}...")
    loop = asyncio.get_running_loop()
    with ThreadPoolExecutor() as pool:
        text = await loop.run_in_executor(pool, whisper_engine.transcribe, chunk_path)
    logger.info(f"Completed transcription of chunk {chunk_id}")
    # Clean up temp files
    try:
        os.unlink(chunk_path)
    except:
        pass
    return {"chunk_id": chunk_id, "text": text}


async def process_audio_file(audio_path: str, websocket: WebSocket, session_id: str):
    try:
        if not os.path.exists(audio_path):
            logger.error(f"Error: File not found: {audio_path}")
            return ""

        logger.info(f"Loading audio file: {audio_path}")
        audio, samplerate = sf.read(audio_path)
        logger.info(f"Audio loaded: {len(audio)/samplerate:.2f} seconds at {samplerate}Hz")

        # Convert audio to 16kHz if needed
        target_samplerate = 16000
        if samplerate != target_samplerate:
            logger.info(f"Resampling from {samplerate}Hz to {target_samplerate}Hz...")
            import librosa
            audio = librosa.resample(
                audio, orig_sr=samplerate, target_sr=target_samplerate
            )
            samplerate = target_samplerate

        # Create larger chunks to reduce overhead
        chunk_size = 10 * samplerate  # 10 seconds in samples
        overlap = int(0.2 * samplerate)  # 0.2 sec overlap

        position = 0
        chunk_id = 0
        combined_text = ""

        while position < len(audio):
            end = min(position + chunk_size, len(audio))
            chunk_audio = audio[position:end]

            # Process each chunk with a temp file
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as chunk_wav:
                sf.write(chunk_wav.name, chunk_audio, samplerate)
                logger.info(
                    f"Created chunk {chunk_id}: {position/samplerate:.2f}s to {end/samplerate:.2f}s"
                )

                # Process chunks one at a time to avoid memory issues
                result = await transcribe_chunk(chunk_wav.name, chunk_id)
                
                # Stream the transcription chunk to the frontend immediately
                chunk_text = result["text"]
                logger.info(f"Chunk {chunk_id} transcription: {chunk_text}")
                
                await websocket.send_json({
                    "session_id": session_id,
                    "status": "chunk_transcription",
                    "chunk_id": chunk_id,
                    "text": chunk_text
                })
                
                combined_text += " " + chunk_text
                
                # Force garbage collection
                gc.collect()

            position += chunk_size - overlap
            chunk_id += 1

        return combined_text.strip()

    except Exception as e:
        logger.error(f"Error in processing audio: {e}")
        import traceback
        traceback.print_exc()
        return ""

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection established")
    
    session_id = str(uuid.uuid4())
    temp_video_path = None
    
    try:
        # Create a temporary file to collect all video chunks
        with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as video_file:
            temp_video_path = video_file.name
            
            # Receive chunks until EOF marker
            chunks_received = 0
            total_bytes = 0
            
            logger.info(f"Started receiving video chunks for session {session_id}")
            
            while True:
                try:
                    data = await websocket.receive_bytes()
                    
                    # Check for EOF marker (small buffer)
                    if not data or len(data) < 10:
                        logger.info(f"Received EOF marker for session {session_id}")
                        break
                    
                    # Write chunk to file
                    video_file.write(data)
                    chunks_received += 1
                    total_bytes += len(data)
                    
                    # Send acknowledgment
                    await websocket.send_json({
                        "session_id": session_id,
                        "status": "chunk_received",
                        "chunk_number": chunks_received,
                        "bytes_received": total_bytes
                    })
                    
                    if chunks_received % 10 == 0:
                        logger.info(f"Received {chunks_received} chunks, total size: {total_bytes} bytes")
                
                except WebSocketDisconnect:
                    logger.info(f"Client disconnected for session {session_id}")
                    return
            
            # Ensure all data is written to disk
            video_file.flush()
        
        # Check if we received any data
        if total_bytes == 0:
            await websocket.send_json({
                "session_id": session_id,
                "status": "error",
                "message": "Received empty file"
            })
            return

        logger.info(f"Video received: {total_bytes} bytes in {chunks_received} chunks. Processing...")
        
        # Send processing notification
        await websocket.send_json({
            "session_id": session_id,
            "status": "processing",
            "message": "Starting transcription process"
        })
        
        # Extract audio from the video
        audio_path = await extract_audio_from_buffer(open(temp_video_path, "rb").read(), session_id)
        if not audio_path:
            await websocket.send_json({
                "session_id": session_id,
                "status": "error",
                "message": "Failed to extract audio from video"
            })
            return
        
        # Process the audio and stream transcription chunks
        transcription = await process_audio_file(audio_path, websocket, session_id)
        
        # Send completion notification with full transcription
        await websocket.send_json({
            "session_id": session_id,
            "status": "completed",
            "transcription": transcription
        })
        
        # Cleanup
        try:
            if os.path.exists(audio_path):
                os.unlink(audio_path)
        except:
            pass
            
    except Exception as e:
        logger.error(f"Error in websocket endpoint: {str(e)}")
        if websocket.application_state == WebSocketState.CONNECTED:
            try:
                await websocket.send_json({
                    "session_id": session_id,
                    "status": "error",
                    "message": str(e)
                })
            except:
                logger.error("Could not send error message to client")
    finally:
        # Clean up temporary files
        if temp_video_path and os.path.exists(temp_video_path):
            try:
                os.unlink(temp_video_path)
            except:
                pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)