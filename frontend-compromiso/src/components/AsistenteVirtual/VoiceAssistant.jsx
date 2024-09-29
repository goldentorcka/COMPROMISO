import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VoiceAssistant = ({ isListening, onVoiceResponse }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  useEffect(() => {
    if (transcript) {
      // Aquí podrías hacer una llamada a tu backend para procesar la pregunta
      onVoiceResponse(`You asked: ${transcript}`);
      resetTranscript();
    }
  }, [transcript, onVoiceResponse, resetTranscript]);

  return null; // Este componente no necesita renderizar nada
};

export default VoiceAssistant;
