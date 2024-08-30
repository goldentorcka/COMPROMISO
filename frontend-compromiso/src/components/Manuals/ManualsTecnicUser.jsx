import React from 'react';
import PdfViewer from '../pdf/PdfViewer.jsx'; 
import NavMenuPublic from '../Nav/NavMenuPublic'; 

const ManualViewer = ({ techManual, userManual }) => {
  // Estilos en línea
  const styles = {
    manualViewer: {
      padding: '20px',
      marginTop: '80px',
    },
    manualSection: {
      marginBottom: '40px',
    },
    sectionTitle: {
      marginBottom: '20px',
    }
  };

  return (
    <>
      <NavMenuPublic />
      <div style={styles.manualViewer}>
        <div style={styles.manualSection}>
          <h1 style={styles.sectionTitle}>Manual Técnico</h1>
          <PdfViewer pdfUrl={techManual} />
        </div>
        <div style={styles.manualSection}>
          <h1 style={styles.sectionTitle}>Manual de Usuario</h1>
          <PdfViewer pdfUrl={userManual} />
        </div>
      </div>
    </>
  );
};

export default ManualViewer;