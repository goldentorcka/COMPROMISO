import React, { useState } from 'react';
import NavMenuPublic from '../../Nav/NavMenuPublic';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const ManualViewer = () => {
  const [showTechModal, setShowTechModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleTechModalClose = () => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar este modal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setShowTechModal(false);
      }
    });
  };

  const handleTechModalShow = () => setShowTechModal(true);

  const handleUserModalClose = () => {
    MySwal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar este modal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setShowUserModal(false);
      }
    });
  };

  const handleUserModalShow = () => setShowUserModal(true);

  return (
    <>
      <NavMenuPublic />

      {/* Contenedor principal */}
      <div style={containerStyle}>
        <h1 style={mainTitleStyle}>Manuales Disponibles</h1>

        {/* Manual Técnico */}
        <div style={manualCardStyle}>
          <h2 style={manualTitleStyle}>Manual Técnico</h2>
          <button 
            onClick={handleTechModalShow} 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Ver Manual Técnico
          </button>
        </div>

        {/* Manual de Usuario */}
        <div style={manualCardStyle}>
          <h2 style={manualTitleStyle}>Manual de Usuario</h2>
          <button 
            onClick={handleUserModalShow} 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Ver Manual de Usuario
          </button>
        </div>
      </div>

      {/* Modal del Manual Técnico */}
      {showTechModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button 
              onClick={handleTechModalClose} 
              style={closeButtonStyle}
            >
              <span style={closeButtonIconStyle}>
                <img src="https://img.icons8.com/ios-filled/50/ffffff/x.png" alt="Cerrar" style={iconStyle} />
              </span>
            </button>
            <h3 style={modalTitleStyle}>MANUAL TÉCNICO</h3>
            <iframe
              src= "/pdf/MANUAL_TECNICO.pdf"
              style={iframeStyle}
              title="Manual Técnico"
            ></iframe>
            <div style={modalFooterStyle}>
              <a href="/pdf/MANUAL_TECNICO.pdf" target="_blank" rel="noopener noreferrer" style={modalButtonStyle}>
                Ver en otra ventana
              </a>
              <a href="/pdf/MANUAL_TECNICO.pdf" download style={downloadButtonStyle}>
                Descargar
              </a>
            </div>
          </div>
        </div>
      )}


      {/* Modal del Manual de Usuario */}
      {showUserModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button 
              onClick={handleUserModalClose} 
              style={closeButtonStyle}
            >
              <span style={closeButtonIconStyle}>
                <img src="https://img.icons8.com/ios-filled/50/ffffff/x.png" alt="Cerrar" style={iconStyle} />
              </span>
            </button>
            <h3 style={modalTitleStyle}>MANUAL DE USUARIO</h3>
            <iframe
              src="/pdf/MANUAL_DE_USUARIO.pdf"
              style={iframeStyle}
              title="Manual de Usuario"
            ></iframe>
            <div style={modalFooterStyle}>
              <a href="/pdf/MANUAL_DE_USUARIO.pdf" target="_blank" rel="noopener noreferrer" style={modalButtonStyle}>
                Ver en otra ventana
              </a>
              <a href="/pdf/MANUAL_DE_USUARIO.pdf" download style={downloadButtonStyle}>
                Descargar
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Estilos en línea
const containerStyle = {
  textAlign: 'center',
  padding: '100px 20px',
  backgroundColor: '#f4f4f4',
  minHeight: '100vh',
};

const mainTitleStyle = {
  fontSize: '2.5rem',
  marginBottom: '40px',
  color: '#333',
  fontWeight: 'bold',
};

const manualCardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  margin: '30px auto',
  padding: '30px',
  maxWidth: '600px',
  textAlign: 'center',
  transition: 'transform 0.2s',
};

const manualTitleStyle = {
  fontSize: '1.75rem',
  marginBottom: '20px',
  color: '#555',
  fontWeight: '500',
};

const buttonStyle = {
  padding: '14px 28px',
  fontSize: '18px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
  marginTop: '10px',
  textAlign: 'center',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  width: '100vw',
  height: '100vh',
};

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  width: '60%',
  height: '70%',
  maxWidth: '700px',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
};

const iframeStyle = {
  width: '100%',
  height: '400px',
  border: 'none',
  marginBottom: '20px',
  flex: 1,
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
  padding: '10px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#d33', // Fondo rojo para destacar
  border: '2px solid #fff', // Borde blanco para contraste
  borderRadius: '50%', // Redondear el botón
  cursor: 'pointer',
  zIndex: 1001,
  padding: '10px',
  transition: 'transform 0.2s ease',
};

const closeButtonIconStyle = {
  color: '#fff', // Ícono blanco
  fontSize: '24px', // Aumentar el tamaño del ícono
};

const iconStyle = {
  width: '30px', // Aumentar el tamaño del ícono
  height: '30px',
};


const modalTitleStyle = {
  marginBottom: '25px',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: 'Georgia, serif',
  textTransform: 'uppercase',
};

const modalButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px',
};

const downloadButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px',
};

export default ManualViewer;