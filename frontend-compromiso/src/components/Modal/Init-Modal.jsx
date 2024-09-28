import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Modal.css'; // Importa el archivo CSS para las animaciones

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
      <div className={`modal-content ${isOpen ? 'animate__animated animate__flipInX' : ''}`} style={{ borderRadius: '10px', width: '50%', margin: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
