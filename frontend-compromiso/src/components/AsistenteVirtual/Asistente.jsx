// src/components/AsistenteVirtual/Asistente-virtual.jsx
import React, { useState } from 'react';
import './AsistenteVirtual.css'; // Archivo de estilos para animaciones

function AsistenteVirtual() {
  const [message, setMessage] = useState('¡Hola! ¿En qué puedo ayudarte?');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuestion = (question) => {
    setIsProcessing(true);
    setTimeout(() => {
      if (question.toLowerCase() === '¿cómo estás?') {
        setMessage('Estoy bien, gracias por preguntar.');
      } else {
        setMessage('Procesando respuesta...');
        // Simulación de lógica para buscar respuesta desde una fuente externa
        setTimeout(() => {
          setMessage(
            'Aquí tienes la respuesta: <a href="https://ejemplo.com" style="color:blue">Fuente</a>'
          );
        }, 2000); // Simulación de tiempo de respuesta externa
      }
      setIsProcessing(false);
    }, 1000); // Simulación de procesamiento
  };

  return (
    <div className="asistente-virtual">
      <p dangerouslySetInnerHTML={{ __html: isProcessing ? 'Procesando pregunta...' : message }}></p>
      <input
        type="text"
        placeholder="Escribe tu pregunta"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleQuestion(e.target.value);
            e.target.value = ''; // Limpia el input después de enviar la pregunta
          }
        }}
      />
    </div>
  );
}

export default AsistenteVirtual;
