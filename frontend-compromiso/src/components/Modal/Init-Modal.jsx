import React from 'react';
import '../styles/Modal.css'; // Asegúrate de que este archivo exista y contenga los estilos

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
