import React from 'react';
import '../styles/stylesAsistente.css'; // Asegúrate de incluir estilos para los gestos



const Gestures = ({ isSpeaking }) => {
  return (
    <div className={`gestures ${isSpeaking ? 'speaking' : ''}`}>
      {/* Aquí puedes agregar animaciones, como SVG o CSS para hacer que el asistente "hable" */}
      <p>{isSpeaking ? "El asistente está hablando..." : "El asistente está listo para escuchar."}</p>
    </div>
  );
};

export default Gestures;
