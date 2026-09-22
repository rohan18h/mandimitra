"""
MandiMitra — Python Audio STT & TTS Service
Provides server-side Speech-to-Text (STT) and Text-to-Speech (TTS)
for Marathi (mr-IN), Hindi (hi-IN), and English (en-IN).
"""

import io
import base64
import speech_recognition as sr
from gtts import gTTS

class AudioService:
    def __init__(self):
        self.recognizer = sr.Recognizer()

    def text_to_speech_bytes(self, text: str, lang: str = "mr", slow: bool = False) -> io.BytesIO:
        """
        Converts text into MP3 audio in-memory using Google Text-to-Speech (gTTS).
        Supports Marathi ('mr'), Hindi ('hi'), and English ('en').
        """
        gtts_lang = "mr" if lang == "mr" else ("hi" if lang == "hi" else "en")
        tts = gTTS(text=text, lang=gtts_lang, slow=slow)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        return fp

    def text_to_speech_base64(self, text: str, lang: str = "mr", slow: bool = False) -> str:
        """
        Returns a data:audio/mp3;base64 URL ready for browser audio playback.
        """
        fp = self.text_to_speech_bytes(text, lang, slow)
        encoded = base64.b64encode(fp.read()).decode('utf-8')
        return f"data:audio/mp3;base64,{encoded}"

    def speech_to_text(self, audio_bytes_or_fp, lang: str = "mr") -> str:
        """
        Converts audio stream to text using SpeechRecognition engine.
        """
        sr_lang = "mr-IN" if lang == "mr" else ("hi-IN" if lang == "hi" else "en-IN")
        try:
            with sr.AudioFile(audio_bytes_or_fp) as source:
                audio_data = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio_data, language=sr_lang)
                return text
        except Exception as e:
            print(f"STT recognition notice: {e}")
            return ""

audio_service = AudioService()
