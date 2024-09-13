import React from 'react';
import '../styles/Pagination.css'; // Archivo CSS para los estilos

function Pagination({ totalRegistros, registrosPorPagina, paginaActual, setPaginaActual }) {
  const totalPages = Math.ceil(totalRegistros / registrosPorPagina);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPaginaActual(newPage);
    }
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
    </div>
  );
}

export default Pagination;
