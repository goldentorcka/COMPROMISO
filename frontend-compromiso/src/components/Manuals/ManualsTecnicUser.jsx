import React from 'react';
import PdfViewer from '../pdf/PdfViewer.jsx'; 
import NavMenuPublic from '../Nav/NavMenuPublic'; 

const ManualViewer = ({ techManual, userManual }) => {
  return (
    <>
      <NavMenuPublic />
      <div className="manual-viewer" style={{ padding: '20px', marginTop: '80px' }}>
        <div className="manual-section" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Manual Técnico</h1>
          <PdfViewer pdfUrl={techManual} />
        </div>
        <div className="manual-section">
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Manual de Usuario</h1>
          <PdfViewer pdfUrl={userManual} />
        </div>
      </div>
    </>
  );
};

export default ManualViewer;
