import React from 'react';
import DocumentoActions from './DocumentoActions';

const App = () => {
  const documento = {
    url: 'http://example.com/mi-documento.pdf',
    nombre: 'mi-documento.pdf',
  };

  return (
    <div>
      <h1>Acciones del Documento</h1>
      <DocumentoActions documento={documento} />
    </div>
  );
};

export default App;
