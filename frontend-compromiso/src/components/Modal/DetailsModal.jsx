import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import '../styles/Modal.css'; // Asegúrate de que este archivo exista y contenga los estilos

const DetailsModal = ({ showModal, handleClose, member }) => {
  if (!member) return null;

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{member.title || 'Detalles'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {member.carouselItems && member.carouselItems.length > 0 ? (
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
        ) : (
          <p>No hay imágenes para mostrar.</p>
        )}
        <div className="member-info" style={{ marginTop: '20px' }}>
          <p>{member.description || 'Descripción no disponible.'}</p>
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
