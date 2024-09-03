import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import './DetailsModal.css'; // Asegúrate de importar el archivo CSS

const DetailsModal = ({ showModal, handleClose, member }) => {
  if (!member) return null;

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{member.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Carrusel con deslizamiento automático */}
        <Carousel interval={3000} controls={false} indicators={true} pause={false}>
          {member.carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-image-container">
                <img
                  className="carousel-image"
                  src={item.img}
                  alt={`Slide ${index}`}
                />
                <div className="carousel-description">
                  {item.caption}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="member-info" style={{ marginTop: '20px' }}>
          {/* Esta parte muestra la descripción del miembro */}
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
