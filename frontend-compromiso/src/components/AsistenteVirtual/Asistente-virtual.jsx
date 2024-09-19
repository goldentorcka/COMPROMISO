import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/AsistenteVirtual.css';

const AsistenteVirtual = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [userValid, setUserValid] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (showChatbot) {
      setMessages([
        { role: 'assistant', content: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' },
        { role: 'assistant', content: '¿Quieres saber sobre noticias, el clima, información técnica, o algo más?' }
      ]);
    }
  }, [showChatbot]);

  const handleVoiceRecognition = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const voiceMessage = event.results[0][0].transcript;
        setMessages((prevMessages) => [...prevMessages, { role: 'user', content: voiceMessage }]);
        sendMessageToAPI(voiceMessage);
        setListening(false);
      };
      recognition.onerror = () => {
        setListening(false);
      };
    } else {
      console.warn('Speech Recognition API no está disponible en este navegador.');
    }
  };

  const handleToggle = () => {
    setShowChatbot(!showChatbot);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessageToAPI = async (message) => {
    try {
      const userResponse = await axios.post('/api/validateUser', { username: message });
      if (userResponse.data.valid) {
        setUserValid(true);
      } else {
        setUserValid(false);
      }

      const response = await axios.post('https://api.ollama.com/models/your-model-endpoint', {
        message: message,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OLLAMA_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const responseMessage = response.data.response;
      autoTypeMessage(responseMessage, setMessages, speakMessage);
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Ocurrió un error. Por favor, intenta de nuevo más tarde.' }
      ]);
    }
  };

  const speakMessage = (message) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const autoTypeMessage = (message, setMessages, speakMessage) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: message }]);
    speakMessage(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }]);
      sendMessageToAPI(input);
      setInput('');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    setPhotoTaken(imageData);
    analyzeFace(imageData);
  };

  const analyzeFace = async (imageData) => {
    const subscriptionKey = 'YOUR_AZURE_FACE_API_KEY';
    const endpoint = 'YOUR_AZURE_FACE_API_ENDPOINT';
    const url = `${endpoint}/face/v1.0/detect?returnFaceAttributes=age`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/octet-stream',
        },
        body: imageData.split(',')[1],
      });

      const data = await response.json();
      if (data.length > 0) {
        const age = data[0].faceAttributes.age;
        setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: `La edad estimada es ${age} años.` }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: 'No se pudo analizar la imagen.' }]);
      }
    } catch (error) {
      console.error('Error en el análisis facial:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: 'Error al analizar la imagen.' }]);
    }
  };

  return (
    <div className={`chatbot ${showChatbot ? 'active' : ''}`}>
      <button className="chatbot-toggle" onClick={handleToggle}>
        {showChatbot ? 'Cerrar' : 'Abrir Chatbot'}
      </button>
      {showChatbot && (
        <div className="chatbox">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role}>
                {msg.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Escribe tu mensaje..." 
              autoFocus 
            />
            <button type="submit">Enviar</button>
          </form>
          <button onClick={handleVoiceRecognition} disabled={listening}>
            {listening ? 'Escuchando...' : 'Hablar'}
          </button>
          <div className="camera">
            <video ref={videoRef} width="300" height="200" autoPlay />
            <button onClick={startCamera}>Iniciar Cámara</button>
            <canvas ref={canvasRef} width="300" height="200" style={{ display: 'none' }} />
            <button onClick={capturePhoto}>Tomar Foto</button>
          </div>
          {photoTaken && <img src={photoTaken} alt="Foto capturada" />}
        </div>
      )}
      {userValid && <div className="admin-panel">Aquí va el panel administrador</div>}
    </div>
  );
};

export default AsistenteVirtual;
