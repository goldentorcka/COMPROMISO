import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importar la librería para Excel
import '../styles/Pagination.css'; // Archivo CSS para los estilos

function Pagination({ 
  totalRegistros, 
  registrosPorPagina, 
  paginaActual, 
  setPaginaActual, 
  registros // Prop para los registros
}) {
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

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(registros);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
    XLSX.writeFile(workbook, 'registros.xlsx');
  };

  const handlePdfDownload = () => {
    // Lógica para descargar PDF
    const doc = new jsPDF();
    doc.text("Registros", 10, 10);
    registros.forEach((registro, index) => {
      doc.text(`Registro ${index + 1}: ${JSON.stringify(registro)}`, 10, 20 + index * 10);
    });
    doc.save('registros.pdf');
  };

  const handleSqlDownload = () => {
    // Lógica para crear un archivo SQL
    const sqlStatements = registros.map((registro) => {
      return `INSERT INTO tu_tabla (campo1, campo2) VALUES ('${registro.campo1}', '${registro.campo2}');`;
    }).join('\n');

    const blob = new Blob([sqlStatements], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registros.sql';
    a.click();
    URL.revokeObjectURL(url);
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
            <div className="icon-item" onClick={handleExcelDownload}>
              <span className="pi pi-file-excel"></span>
            </div>
            <div className="icon-item" onClick={handlePdfDownload}>
              <span className="pi pi-file-pdf"></span>
            </div>
            <div className="icon-item" onClick={handleSqlDownload}>
              <span className="pi pi-file-sql"></span> {/* Icono SQL */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
