# scrapsmart
hackru

## AI voice

The AI chat answers in the language of the user's message. For multilingual voice input and ElevenLabs speech output, configure these secrets for the deployed Base44 function:

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

Voice input uses ElevenLabs Scribe language detection when configured. Without it, the assistant falls back to browser speech recognition and speech synthesis where supported.
