import whisper


class WhisperEngine:
    def __init__(self, model_name: str = "tiny"):
        print(f"Loading whisper model: {model_name}")
        # Use a smaller model and ensure CPU mode
        self.model = whisper.load_model(model_name, device="cpu")
        print("Model loaded successfully")

    def transcribe(self, audio_path: str):
        try:
            # Use a more efficient configuration
            options = {
                "fp16": False,
                "language": "en",  # Set to your language
                "beam_size": 1,  # Reduce beam size for faster processing
                "best_of": 1,  # Only get the top result
            }
            result = self.model.transcribe(audio_path, **options)
            return result["text"]
        except Exception as e:
            print(f"Whisper transcription error: {e}")
            return ""
