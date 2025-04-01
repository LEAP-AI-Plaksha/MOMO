from concurrent.futures import ThreadPoolExecutor
import tempfile
import asyncio
import subprocess
import os
from loguru import logger

async def extract_audio_from_buffer(buffer, session_id):
    """Extract audio from video buffer using FFmpeg and return the path to the extracted audio file"""
    logger.info(f"Extracting audio from video buffer for session {session_id}")

    # Create temp files for the input video buffer and output audio
    with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as video_temp:
        video_path = video_temp.name
        video_temp.write(buffer)
        video_temp.flush()

    audio_temp = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    audio_path = audio_temp.name
    audio_temp.close()

    # Use ffmpeg to extract audio
    loop = asyncio.get_running_loop()

    def _extract_audio():
        try:
            # FFmpeg command to extract audio
            cmd = [
                "ffmpeg",
                "-i",
                video_path,  # Input video
                "-vn",  # No video
                "-acodec",
                "pcm_s16le",  # Output codec (WAV)
                "-ar",
                "16000",  # Sample rate 16kHz (what Whisper expects)
                "-ac",
                "1",  # Mono audio
                "-loglevel",
                "error",  # Reduce console output
                "-y",  # Overwrite output file
                audio_path,  # Output file
            ]

            # Run FFmpeg process
            process = subprocess.run(
                cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )

            # Check if output file exists
            if os.path.exists(audio_path) and os.path.getsize(audio_path) > 0:
                return audio_path
            else:
                logger.error(f"FFmpeg did not produce output file: {process.stderr.decode()}")
                return None

        except subprocess.CalledProcessError as e:
            logger.error(f"FFmpeg error: {e.stderr.decode() if e.stderr else str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error extracting audio: {e}")
            import traceback
            traceback.print_exc()
            return None
        finally:
            # Clean up video temp file
            try:
                os.unlink(video_path)
            except:
                pass

    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(pool, _extract_audio)

    return result

if __name__ == "__main__":
    pass