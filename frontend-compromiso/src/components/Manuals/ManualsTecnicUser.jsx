import React from 'react';
import NavMenuPublic from '../Nav/NavMenuPublic.jsx'; // Importa la barra de navegación

const ManualViewer = ({ techManual, userManual }) => {
  return (
    <>
      {/* Barra de navegación */}
      <NavMenuPublic />

      {/* Contenido de los manuales */}
      <div className="container mt-5" style={{ padding: '0 15px' }}>
        <h2
          className="text-center mb-4"
          style={{
            color: '#2c3e50',
            fontFamily: "'Roboto', sans-serif",
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
          }}
        >
          Manuales
        </h2>

        <div className="manual-section mb-4">
          <h3
            className="fw-normal"
            style={{
              fontSize: '1.8rem',
              marginTop: '20px',
              color: '#34495e',
              borderBottom: '2px solid #3498db',
              paddingBottom: '5px',
            }}
          >
            Manual Técnico
          </h3>
          <iframe
            src={techManual}
            title="Manual Técnico"
            className="manual-iframe"
            style={{
              width: '100%',
              height: '400px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          ></iframe>
        </div>

        <div className="manual-section">
          <h3
            className="fw-normal"
            style={{
              fontSize: '1.8rem',
              marginTop: '20px',
              color: '#34495e',
              borderBottom: '2px solid #3498db',
              paddingBottom: '5px',
            }}
          >
            Manual de Usuario
          </h3>
          <iframe
            src={userManual}
            title="Manual de Usuario"
            className="manual-iframe"
            style={{
              width: '100%',
              height: '400px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ManualViewer;
