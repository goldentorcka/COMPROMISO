import React, { useState } from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic';

// Importa los archivos PDF
import techManual from '../../../src/Public/pdf/Manual_de_las_Buenas_Prácticas_de_Ordeño.pdf';
import userManual from '../../../src/Public/pdf/OPERACIONES_BASICAS.pdf';

const ManualViewer = () => {
  // Manejo del estado de los modales
  const [showTechModal, setShowTechModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Funciones para abrir/cerrar los modales
  const handleTechModalClose = () => setShowTechModal(false);
  const handleTechModalShow = () => setShowTechModal(true);

  const handleUserModalClose = () => setShowUserModal(false);
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
          <button onClick={handleTechModalShow} style={buttonStyle}>
            Ver Manual Técnico
          </button>
        </div>

        {/* Manual de Usuario */}
        <div style={manualCardStyle}>
          <h2 style={manualTitleStyle}>Manual de Usuario</h2>
          <button onClick={handleUserModalShow} style={buttonStyle}>
            Ver Manual de Usuario
          </button>
        </div>
      </div>

      {/* Modal del Manual Técnico */}
      {showTechModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button onClick={handleTechModalClose} style={closeButtonStyle}>X</button>
            <h3 style={modalTitleStyle}>Manual Técnico</h3>
            <iframe
              src={techManual}
              style={iframeStyle}
              title="Manual Técnico"
            ></iframe>
            <div style={modalFooterStyle}>
              <a href={techManual} target="_blank" rel="noopener noreferrer" style={modalButtonStyle}>
                Ver en otra ventana
              </a>
              <a href={techManual} download style={downloadButtonStyle}>
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
            <button onClick={handleUserModalClose} style={closeButtonStyle}>X</button>
            <h3 style={modalTitleStyle}>Manual de Usuario</h3>
            <iframe
              src={userManual}
              style={iframeStyle}
              title="Manual de Usuario"
            ></iframe>
            <div style={modalFooterStyle}>
              <a href={userManual} target="_blank" rel="noopener noreferrer" style={modalButtonStyle}>
                Ver en otra ventana
              </a>
              <a href={userManual} download style={downloadButtonStyle}>
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
  padding: '100px 20px', // Se agregó un mayor margen superior para que quede debajo de la barra de navegación
  backgroundColor: '#f4f4f4',
  minHeight: '100vh'
};

const mainTitleStyle = {
  fontSize: '2.5rem',
  marginBottom: '40px',
  color: '#333',
  fontWeight: 'bold'
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
  fontWeight: '500'
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
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '900px',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '22px',
  cursor: 'pointer',
  color: '#555'
};

const modalTitleStyle = {
  marginBottom: '25px',
  color: '#333',
  fontWeight: 'bold',
};

const iframeStyle = {
  width: '100%',
  height: '500px',
  border: 'none',
  marginBottom: '20px'
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const modalButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const downloadButtonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default ManualViewer;