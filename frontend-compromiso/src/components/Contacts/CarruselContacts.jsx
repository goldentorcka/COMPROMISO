import React, { useState } from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic.jsx';
import imgJulian from '../../../Public/images/ImagesMenbersGroup/IMG_Julian_Montaña.jpeg';
import imgMarlon from '../../../Public/images/ImagesMenbersGroup/IMG_Marlon_Cumbe.jpeg';
import imgSofia1 from '../../../Public/images/ImagesMenbersGroup/sofia1.jpeg';
import imgSofia2 from '../../../Public/images/ImagesMenbersGroup/sofia2.jpeg';
import imgSofia3 from '../../../Public/images/ImagesMenbersGroup/sofia3.jpeg';
import imgJulian1 from '../../../Public/images/ImagesMenbersGroup/julia1.jpeg';
import imgJulian2 from '../../../Public/images/ImagesMenbersGroup/julian2.jpeg';
import imgMarlon2 from '../../../Public/images/ImagesMenbersGroup/cumbe.jpeg';
import imgMarlon3 from '../../../Public/images/ImagesMenbersGroup/cumbe2.jpeg';
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
          img: imgJulian,
          caption: 'Nació en Espinal-Tolima, tiene 19 años.',
        },
        {
          img: imgJulian1,
          caption: 'Le gusta la programación.',
        },
        {
          img: imgJulian2,
          caption: 'Es un gran jugador de ajedrez.',
        },
      ],
      facebook: 'https://www.facebook.com/julian.montana',
      instagram: 'https://www.instagram.com/julian.montana',
    },
    {
      name: 'Marlon Javier Cumbe Loaiza',
      description: 'GERENTE',
      carouselItems: [
        {
          img: imgMarlon,
          caption: 'Nació en Coyaima-Tolima, tiene 18 años.',
        },
        {
          img: imgMarlon2,
          caption: 'Le gusta el fútbol.',
        },
        {
          img: imgMarlon3,
          caption: 'Es una persona muy organizada y meticulosa.',
        },
      ],
      facebook: 'https://www.facebook.com/profile.php?id=61561011352009&mibextid=ZbWKwL',
      instagram: 'https://www.instagram.com/marlxon69?igsh=MXI4bHo2bjdlZHAxag==',
    },
    {
      name: 'Sofía López',
      description: 'DISEÑADORA',
      carouselItems: [
        {
          img: imgSofia1,
          caption: 'Nació en Ibagué, le encanta el diseño gráfico.',
        },
        {
          img: imgSofia2,
          caption: 'Su hobby es la fotografía.',
        },
        {
          img: imgSofia3,
          caption: 'Siempre está buscando nuevas tendencias.',
        },
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
                      src="../Public/images/icons/facebook.png" 
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
                      src="../Public/images/icons/instagram.png" 
                      width="30" 
                      height="30" 
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                      alt="Instagram"
                    />
                  </a>
                </div>

                {/* <p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleShow(member)}
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
                  </button>
                </p> */}
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
