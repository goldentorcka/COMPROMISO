import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const DetailsModal = ({ show, handleClose, images }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de Julian Felipe Montaña Ruiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap justify-content-center">
          {images.map((img, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={img}
                alt={`Detalle ${index + 1}`}
                width="150"
                height="150"
                style={{
                  borderRadius: '10px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
