import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css'; // Asegúrate de tener animate.css instalado

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!isOpen}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog modal-lg"> {/* Tamaño del modal */}
        <div
          className={`modal-content ${isOpen ? 'animate__animated animate__fadeIn' : ''}`}
          style={{
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            className="modal-header"
            style={{
              backgroundColor: '#4e73df', // Color de fondo del encabezado
              color: '#fff', // Color del texto
              borderBottom: '2px solid #e1e1e1', // Línea inferior para separar el encabezado
            }}
          >
            <h5 className="modal-title" id="staticBackdropLabel" style={{ fontSize: '1.5rem' }}>
              {title || 'REGISTRO'}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
              style={{
                filter: 'invert(1)', // Cambiar el color del botón cerrar a blanco
              }}
            ></button>
          </div>
          <div
            className="modal-body"
            style={{
              backgroundColor: '#f8f9fc', // Color de fondo del cuerpo del modal
              fontFamily: 'Arial, sans-serif', // Tipo de fuente
              color: '#333', // Color del texto
              padding: '20px', // Espaciado interno
              borderRadius: '8px', // Esquinas redondeadas
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', // Sombra
              fontSize: '1rem', // Tamaño de la letra
              lineHeight: '1.5', // Altura de línea para mejorar la legibilidad
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
