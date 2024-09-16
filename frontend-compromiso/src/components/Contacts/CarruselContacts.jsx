import React, { useState } from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic.jsx';
import imgJulian from '../../../src/Public/images/ImagesMenbersGroup/IMG_Julian_Montaña.jpeg';
import imgMarlon from '../../../src/Public/images/ImagesMenbersGroup/IMG_Marlon_Cumbe.jpeg';
import imgSofia1 from '../../../src/Public/images/ImagesMenbersGroup/sofia1.jpeg';
import imgSofia2 from '../../../src/Public/images/ImagesMenbersGroup/sofia2.jpeg';
import imgSofia3 from '../../../src/Public/images/ImagesMenbersGroup/sofia3.jpeg';
import imgJulian1 from '../../../src/Public/images/ImagesMenbersGroup/julia1.jpeg';
import imgJulian2 from '../../../src/Public/images/ImagesMenbersGroup/julian2.jpeg';
import imgMarlon2 from '../../../src/Public/images/ImagesMenbersGroup/cumbe.jpeg';
import imgMarlon3 from '../../../src/Public/images/ImagesMenbersGroup/cumbe2.jpeg';
import DetailsModal from '../Modal/DetailsModal.jsx';
import audioJulian from '../../../src/Public/audio/Julian.mp3'; // Audio de presentación
import audioMarlon from '../../../src/Public/audio/Marlon.mp3'; // Audio de presentación
import audioSofia from '../../../src/Public/audio/Sofia.mp3'; // Audio de presentación
import '../styles/stylesCarruselContacts.css';

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
      name: 'Julian Felipe Montaña Ruiz',
      description: 'ANALISTA Y DESARROLLADOR',
      className: 'julian',
      carouselItems: [
        {
          img: imgJulian,
          caption: 'Tiene un gran sentido del humor y siempre sabe cómo levantar el ánimo de los demás',
        },
        {
          img: imgJulian1,
          caption: 'Tiene una personalidad calmada y es el tipo de persona soñada',
        },
        {
          img: imgJulian2,
          caption: 'Es un apasionado del fitness y la vida saludable.',
        },
      ],
      audio: audioJulian,
    },
    {
      name: 'Marlon Javier Cumbe Loaiza',
      description: 'GERENTE',
      className: 'marlon',
      carouselItems: [
        {
          img: imgMarlon,
          caption: 'Es una persona muy organizada y meticulosa.',
        },
        {
          img: imgMarlon2,
          caption: 'Es un gran fanático de la tecnología y siempre está al tanto de las últimas innovaciones.',
        },
        {
          img: imgMarlon3,
          caption: 'También aprecia pasar tiempo desconectado, disfrutando de la naturaleza y las caminatas largas.',
        },
      ],
      audio: audioMarlon,
    },
    {
      name: 'Aqnoe Sofía Solano Solaque',
      description: 'ANALISTA Y DESARROLLADORA',
      className: 'sofia',
      carouselItems: [
        {
          img: imgSofia1,
          caption: 'Es una entusiasta del aprendizaje continuo.',
        },
        {
          img: imgSofia2,
          caption: 'Es muy intuitiva y tiene una gran habilidad para escuchar a los demás.',
        },
        {
          img: imgSofia3,
          caption: 'Es una persona que se desvive por sus amigos y familiares.',
        },
      ],
      audio: audioSofia,
    }
  ];

  const handleMouseEnter = (audio) => {
    const audioElement = new Audio(audio);
    audioElement.play();
  };

  const handleMouseLeave = () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio => audio.pause());
  };

  return (
    <>
      <NavMenuPublic />
      <div className="container mt-5 pt-5" style={{ padding: '0 15px' }}>
        <h1 className="text-center mb-4">Nuestros Integrantes</h1>
        <div className="row">
          {members.map((member, index) => (
            <div className="col-lg-4" key={index}>
              <div className={`member-card ${member.className}`}>
                <div
                  className="img-container"
                  onMouseEnter={() => handleMouseEnter(member.audio)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={member.carouselItems[0].img}
                    alt={member.name}
                    className="profile-img"
                  />
                  <i className="fas fa-volume-up audio-icon"></i> {/* Ícono de audio */}
                </div>
                <h2>{member.name}</h2>
                <p>{member.description}</p>
                <div className="social-icons">
                  <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="mailto:correo@gmail.com">
                    <i className="fas fa-envelope"></i>
                  </a>
                  <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
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
