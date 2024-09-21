import React, { useState } from 'react';
import '../styles/Pagination.css'; // Archivo CSS para los estilos

function Pagination({ totalRegistros, registrosPorPagina, paginaActual, setPaginaActual }) {
  const [showIcons, setShowIcons] = useState(false);
  const totalPages = Math.ceil(totalRegistros / registrosPorPagina);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPaginaActual(newPage);
    }
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation(); // Evitar que el clic propague al contenedor principal
    setShowIcons(!showIcons);
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        &laquo; Anterior
      </button>
   
      <span className="pagination-info">
        Página {paginaActual} de {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={() => handlePageChange(paginaActual + 1)}
        disabled={paginaActual === totalPages}
      >
        Siguiente &raquo;
      </button>

      {/* Botón de refresco */}
      <button
        className="p-button p-component p-button-icon-only p-button-text"
        type="button"
        onClick={() => {
          console.log("Botón de refresco presionado");
          setPaginaActual(1); // Opcional: refresca a la primera página
        }}
      >
        <span className="p-button-icon p-c pi pi-refresh"></span>
        <span className="p-button-label p-c">&nbsp;</span>
      </button>

      {/* Botón de descarga */}
      <div className="download-container">
        <button
          className="p-button p-component p-button-icon-only p-button-text"
          type="button"
          onClick={handleDownloadClick}
        >
          <span className="p-button-icon p-c pi pi-download"></span>
          <span className="p-button-label p-c">&nbsp;</span>
        </button>

        {/* Iconos de descarga al lado del botón */}
        {showIcons && (
          <div className="download-icons">
            <div className="icon-item">
              <span className="pi pi-file-excel"></span>
            </div>
            <div className="icon-item">
              <span className="pi pi-file-pdf"></span>
            </div>
            <div className="icon-item">
              <span className="pi pi-file-sql"></span> {/* Icono SQL */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
