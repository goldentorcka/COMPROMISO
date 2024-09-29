import React, { useState } from 'react';
import VoiceAssistant from './VoiceAssistant';
import Gestures from './Gestures';
import  AnimatedImage  from './AnimatedImage'; // Nuevo componente animado de la imagen
import '../styles/stylesAsistente.css';
import { useSpeechSynthesis } from 'react-speech-kit';

const AsistenteVirtual = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const { speak } = useSpeechSynthesis();

  const handleVoiceResponse = (msg) => {
    setResponse(msg);
  };

  const toggleListening = () => {
    setIsListening(prev => {
      const newStatus = !prev;
      const message = newStatus ? "Asistente activado. ¿En qué puedo ayudarte?" : "Asistente desactivado.";
      speak({ text: message });
      return newStatus;
    });
  };

  return (
    <div className="asistente-container">
      <Gestures isSpeaking={response !== ''} />
      <VoiceAssistant isListening={isListening} onVoiceResponse={handleVoiceResponse} />
      <AnimatedImage onClick={toggleListening} isListening={isListening} />
      <div className="response">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AsistenteVirtual;
