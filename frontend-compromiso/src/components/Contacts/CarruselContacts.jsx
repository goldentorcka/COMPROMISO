import React, { useState } from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic.jsx';
import imgJulian from '../../../src/Public/images/IMG_Julian_Montaña.jpeg';
import imgMarlon from '../../../src/Public/images/IMG_Marlon_Cumbe.jpeg';
import imgSofia from '../../../src/Public/images/IMG_Sofia_Solano.jpeg';
import DetailsModal from '../Modal/DetailsModal.jsx'; // Asegúrate de ajustar la ruta según la ubicación del archivo

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Array de imágenes para mostrar en el modal
  const images = [
    imgJulian,
    imgMarlon,
    imgSofia,
    imgJulian,
    imgMarlon,
  ];

  return (
    <>
      <NavMenuPublic />
      <div className="container mt-5" style={{ padding: '0 15px' }}>
        <h1
          className="text-center mb-4"
          style={{
            color: '#333',
            fontFamily: "'Arial', sans-serif",
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          Nuestros Integrantes
        </h1>
        <div className="row">
          {/* Julian Felipe Montaña Ruiz */}
          <div className="col-lg-4">
            <div
              className="member-card"
              style={{
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            >
              <img
                src={imgJulian}
                alt="Julian Felipe Montaña Ruiz"
                width="140"
                height="140"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#e9ecef',
                  transition: 'background-color 0.3s ease',
                }}
              />
              <h2
                className="fw-normal"
                style={{
                  fontSize: '1.5rem',
                  marginTop: '15px',
                  color: '#333',
                }}
              >
                Julian Felipe Montaña Ruiz
              </h2>
              <p
                style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                }}
              >
                Descripción breve del primer integrante del proyecto. Detalles relevantes y funciones.
              </p>
              <p>
                <a
                  className="btn btn-secondary"
                  onClick={handleShow}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Ver detalles »
                </a>
              </p>
            </div>
          </div>

          {/* Marlon Cumbe */}
          <div className="col-lg-4">
            <div
              className="member-card"
              style={{
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            >
              <img
                src={imgMarlon}
                alt="Marlon Cumbe"
                width="140"
                height="140"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#e9ecef',
                  transition: 'background-color 0.3s ease',
                }}
              />
              <h2
                className="fw-normal"
                style={{
                  fontSize: '1.5rem',
                  marginTop: '15px',
                  color: '#333',
                }}
              >
                Marlon Cumbe
              </h2>
              <p
                style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                }}
              >
                Descripción breve del segundo integrante del proyecto. Información adicional y responsabilidades.
              </p>
              <p>
                <a
                  className="btn btn-secondary"
                  onClick={handleShow}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Ver detalles »
                </a>
              </p>
            </div>
          </div>

          {/* Sofía Solano */}
          <div className="col-lg-4">
            <div
              className="member-card"
              style={{
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            >
              <img
                src={imgSofia}
                alt="Sofía Solano"
                width="140"
                height="140"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#e9ecef',
                  transition: 'background-color 0.3s ease',
                }}
              />
              <h2
                className="fw-normal"
                style={{
                  fontSize: '1.5rem',
                  marginTop: '15px',
                  color: '#333',
                }}
              >
                Sofía Solano
              </h2>
              <p
                style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                }}
              >
                Descripción breve del tercer integrante del proyecto. Experiencia y aportaciones.
              </p>
              <p>
                <a
                  className="btn btn-secondary"
                  onClick={handleShow}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                  Ver detalles »
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para mostrar las imágenes */}
      <DetailsModal show={showModal} handleClose={handleClose} images={images} />
    </>
  );
};

export default ContactUs;
