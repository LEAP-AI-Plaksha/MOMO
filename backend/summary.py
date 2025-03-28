import os
from dotenv import load_dotenv
from google import genai
import re

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)


def get_summary(transcription):

    prompt = f"""
    Summarize the following video transcript in a descriptive way. 
    Include the main topics discussed, key points, and important takeaways.
    Format the summary with clear sections and bullet points where appropriate.
     
    TRANSCRIPT:
    {transcription}
     """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        return response.text
    except Exception as e:
        return f"Error generating summary: {str(e)}"


if __name__ == "__main__":
    pass
