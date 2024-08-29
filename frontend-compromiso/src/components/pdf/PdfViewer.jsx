import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <embed
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="800px"
        style={{ border: '1px solid #ddd' }}
      />
    </div>
  );
};

export default PdfViewer;
