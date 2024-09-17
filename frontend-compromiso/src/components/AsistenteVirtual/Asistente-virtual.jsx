import React, { useState, useRef, useEffect } from 'react';
import '../styles/AsistenteVirtual.css'
const AsistenteVirtual = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Verificar si SpeechRecognition está disponible
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
      const response = await processMessage(message);
      autoTypeMessage(response, setMessages, speakMessage);
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

  const processMessage = async (message) => {
    const lowerCaseMessage = message.toLowerCase();
    let responses = [];

    if (lowerCaseMessage.includes('noticias')) {
      responses.push(await queryNews());
    } else if (lowerCaseMessage.includes('wiki') || lowerCaseMessage.includes('wikipedia')) {
      responses.push(await searchWikipedia(message));
    } else if (lowerCaseMessage.includes('wolfram')) {
      responses.push(await queryWolframAlpha(message));
    } else if (lowerCaseMessage.includes('clima') || lowerCaseMessage.includes('weather')) {
      responses.push(await queryWeather(message));
    } else if (lowerCaseMessage.includes('moneda') || lowerCaseMessage.includes('currency')) {
      responses.push(await queryCurrency(message));
    } else if (lowerCaseMessage.includes('quién te creó') || lowerCaseMessage.includes('creador')) {
      return '¡Claro! Soy creado por Marlon Javier Cumbe Loaiza, un aprendiz en Análisis y Desarrollo de Software en SENA. Puedes encontrar más información en https://www.sena.edu.co.';
    } else {
      return 'Estoy aquí para ayudarte con noticias, información técnica, clima, conversiones de divisas o cualquier otra consulta. ¿En qué puedo asistirte hoy?';
    }

    if (responses.length > 0) {
      const bestResponse = await compareResponses(responses);
      return bestResponse;
    } else {
      return 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla?';
    }
  };

  const compareResponses = async (responses) => {
    const sortedResponses = responses.sort((a, b) => a.length - b.length);
    return sortedResponses.join('\n\n');
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
        body: imageData.split(',')[1], // Enviar la imagen en base64
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
    </div>
  );
};

export default AsistenteVirtual;
