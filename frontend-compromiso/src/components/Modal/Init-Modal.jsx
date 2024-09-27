import React from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  // El modal se renderiza siempre, solo ajustamos la visibilidad
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-dialog modal-dialog-centered">
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
