import React, { useState } from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic.jsx';
import DetailsModal from '../Modal/DetailsModal.jsx';

const ContactUs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleShow = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  // Datos de los miembros
  const members = [
    {
      name: 'Julian Montaña',
      description: 'DESARROLLADOR',
      carouselItems: [
        {
          img: "/images/IMG_Julian_Montaña.jpeg",
          caption: 'Nació en Espinal-Tolima, tiene 19 años.',
        }
      ],
      facebook: 'https://www.facebook.com/julian.montana',
      instagram: 'https://www.instagram.com/julian.montana',
    },
    {
      name: 'Marlon Javier Cumbe Loaiza',
      description: 'GERENTE',
      carouselItems: [
        {
          img: "/images/IMG_Marlon_Cumbe.jpeg",
          caption: 'Nació en Coyaima-Tolima, tiene 18 años.',
        }
      ],
      facebook: 'https://www.facebook.com/profile.php?id=61561011352009&mibextid=ZbWKwL',
      instagram: 'https://www.instagram.com/marlxon69?igsh=MXI4bHo2bjdlZHAxag==',
    },
    {
      name: 'Sofía López',
      description: 'DISEÑADORA',
      carouselItems: [
        {
          img: "/images/IMG_Sofia_Solano.jpeg",
          caption: 'Nació en Ibagué, le encanta el diseño gráfico.',
        }
      ],
      facebook: 'https://www.facebook.com/sofia.lopez',
      instagram: 'https://www.instagram.com/sofia.lopez',
    },
  ];

  return (
    <>
      <NavMenuPublic />
      <div className="container mt-5" style={{ padding: '0 15px' }}>
        <h1
          className="text-center mb-4"
          style={{
            padding: '2rem',
            color: '#333',
            fontFamily: 'Cambria', // Cambiado a Cambria
            fontSize: '3rem', // tamaño 
            fontWeight: 'bold', // Título en negrita
            marginTop: '80px', // Ajustado para asegurar que no quede oculto
          }}
        >
          Nuestros Integrantes
        </h1>
        <div className="row justify-content-center">
          {members.map((member, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
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
                  src={member.carouselItems[0].img}
                  alt={member.name}
                  width="140"
                  height="140"
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    backgroundColor: '#e9ecef',
                    transition: 'background-color 0.3s ease',
                    display: 'block',
                    margin: '0 auto', // Centrar imagen
                  }}
                />

                <h2
                  className="fw-normal"
                  style={{
                    fontSize: '1.5rem',
                    marginTop: '15px',
                    color: '#333',
                    fontFamily: 'Cambria', // Cambiado a Cambria
                    fontWeight: 'bold', // Nombre en negrita
                  }}
                >
                  {member.name}
                </h2>
                <p
                  style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                    fontFamily: 'Cambria', // Cambiado a Cambria
                    fontWeight: 'bold', // Descripción en negrita
                  }}
                >
                  {member.description}
                </p>
                <div className="social-buttons" style={{ marginBottom: '15px', textAlign: 'center' }}>
                  <a 
                    href={member.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', margin: '0 5px' }}
                  >
                    <img 
                      src="/images/facebook.png" 
                      width="30" 
                      height="30" 
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      alt="Facebook"
                    />
                  </a>
                  <a 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', margin: '0 5px' }}
                  >
                    <img 
                      src="/images/instagram.png" 
                      width="30" 
                      height="30" 
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      alt="Instagram"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedMember && (
        <DetailsModal 
          showModal={showModal} 
          handleClose={handleClose} 
          member={selectedMember} 
        />
      )}
    </>
  );
};

export default ContactUs;
