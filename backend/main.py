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
from summary import get_summary

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

# Create multiple whisper engine instances
NUM_ENGINES = 4
whisper_engines = []
# Initialize engines with logging to confirm they're created
for i in range(NUM_ENGINES):
    logger.info(f"Initializing WhisperEngine {i}")
    whisper_engines.append(WhisperEngine("tiny"))
    logger.info(f"WhisperEngine {i} initialized")

# Thread pool for transcription tasks
transcription_executor = ThreadPoolExecutor(max_workers=NUM_ENGINES)

async def transcribe_chunk(chunk_path: str, chunk_id: int, engine_id: int):
    """Transcribe a single audio chunk using the specified engine"""
    try:
        logger.info(f"Starting transcription of chunk {chunk_id} with engine {engine_id}")
        
        # Get the specific engine
        engine = whisper_engines[engine_id]
        
        # Run transcription in thread pool
        loop = asyncio.get_running_loop()
        text = await loop.run_in_executor(
            transcription_executor, 
            engine.transcribe, 
            chunk_path
        )
        
        logger.info(f"Completed transcription of chunk {chunk_id} with engine {engine_id}")
        
        # Clean up temp file
        try:
            os.unlink(chunk_path)
            logger.info(f"Deleted temp file for chunk {chunk_id}")
        except Exception as e:
            logger.error(f"Error deleting temp file {chunk_path}: {e}")
            
        return {"chunk_id": chunk_id, "text": text}
    except Exception as e:
        logger.error(f"Error transcribing chunk {chunk_id}: {e}")
        import traceback
        traceback.print_exc()
        return {"chunk_id": chunk_id, "text": f"[Transcription error: {str(e)}]"}


async def process_audio_file(audio_path: str, websocket: WebSocket, session_id: str):
    try:
        if not os.path.exists(audio_path):
            logger.error(f"Error: File not found: {audio_path}")
            return ""

        logger.info(f"Loading audio file: {audio_path}")
        audio, samplerate = sf.read(audio_path)
        logger.info(
            f"Audio loaded: {len(audio)/samplerate:.2f} seconds at {samplerate}Hz"
        )

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
        chunk_files = []
        
        # Step 1: Create all chunk files
        logger.info("Creating audio chunks...")
        while position < len(audio):
            end = min(position + chunk_size, len(audio))
            chunk_audio = audio[position:end]

            # Create a temp file for this chunk
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as chunk_file:
                chunk_path = chunk_file.name
                sf.write(chunk_path, chunk_audio, samplerate)
                
                logger.info(
                    f"Created chunk {chunk_id}: {position/samplerate:.2f}s to {end/samplerate:.2f}s at {chunk_path}"
                )
                
                chunk_files.append((chunk_id, chunk_path))
                
            position += chunk_size - overlap
            chunk_id += 1
            
        combined_text = ""
        
        # Step 2: Process chunks in batches of NUM_ENGINES
        for i in range(0, len(chunk_files), NUM_ENGINES):
            batch = chunk_files[i:i + NUM_ENGINES]
            
            # Create tasks for this batch
            tasks = []
            for idx, (chunk_id, chunk_path) in enumerate(batch):
                engine_id = idx % NUM_ENGINES
                task = asyncio.create_task(transcribe_chunk(chunk_path, chunk_id, engine_id))
                tasks.append(task)
                
            logger.info(f"Processing batch of {len(tasks)} chunks")
            
            # Wait for all tasks in this batch to complete
            results = await asyncio.gather(*tasks)
            
            # Sort results by chunk_id to maintain order
            results.sort(key=lambda x: x["chunk_id"])
            
            # Process results in order
            for result in results:
                chunk_text = result["text"]
                logger.info(f"Chunk {result['chunk_id']} transcription: {chunk_text}")
                
                # Send chunk to client
                await websocket.send_json(
                    {
                        "session_id": session_id,
                        "status": "chunk_transcription",
                        "chunk_id": result["chunk_id"],
                        "text": chunk_text,
                    }
                )
                
                combined_text += " " + chunk_text
                
            # Force garbage collection after each batch
            gc.collect()

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
                    await websocket.send_json(
                        {
                            "session_id": session_id,
                            "status": "chunk_received",
                            "chunk_number": chunks_received,
                            "bytes_received": total_bytes,
                        }
                    )

                    if chunks_received % 10 == 0:
                        logger.info(
                            f"Received {chunks_received} chunks, total size: {total_bytes} bytes"
                        )

                except WebSocketDisconnect:
                    logger.info(f"Client disconnected for session {session_id}")
                    return

            # Ensure all data is written to disk
            video_file.flush()

        # Check if we received any data
        if total_bytes == 0:
            await websocket.send_json(
                {
                    "session_id": session_id,
                    "status": "error",
                    "message": "Received empty file",
                }
            )
            return

        logger.info(
            f"Video received: {total_bytes} bytes in {chunks_received} chunks. Processing..."
        )

        # Send processing notification
        await websocket.send_json(
            {
                "session_id": session_id,
                "status": "processing",
                "message": "Starting transcription process",
            }
        )

        # Extract audio from the video
        audio_path = await extract_audio_from_buffer(
            open(temp_video_path, "rb").read(), session_id
        )
        if not audio_path:
            await websocket.send_json(
                {
                    "session_id": session_id,
                    "status": "error",
                    "message": "Failed to extract audio from video",
                }
            )
            return

        # Process the audio and stream transcription chunks
        transcription = await process_audio_file(audio_path, websocket, session_id)

        # Send completion notification with full transcription
        await websocket.send_json(
            {
                "session_id": session_id,
                "status": "completed",
                "transcription": transcription,
            }
        )
        
        # Generate and send summary
        logger.info("Generating summary...")
        summary_of_transcription = get_summary(transcription)
        await websocket.send_json(
            {
                "session_id": session_id,
                "status": "completed",
                "summary": summary_of_transcription,
            }
        )
        
        # Cleanup
        try:
            if os.path.exists(audio_path):
                os.unlink(audio_path)
        except Exception as e:
            logger.error(f"Error deleting audio file: {e}")

    except Exception as e:
        logger.error(f"Error in websocket endpoint: {str(e)}")
        if websocket.application_state == WebSocketState.CONNECTED:
            try:
                await websocket.send_json(
                    {"session_id": session_id, "status": "error", "message": str(e)}
                )
            except:
                logger.error("Could not send error message to client")
    finally:
        # Clean up temporary files
        if temp_video_path and os.path.exists(temp_video_path):
            try:
                os.unlink(temp_video_path)
            except Exception as e:
                logger.error(f"Error deleting video file: {e}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)