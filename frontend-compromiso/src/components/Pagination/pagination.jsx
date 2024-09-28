import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importar la librería para Excel
import { jsPDF } from 'jspdf'; // Asegúrate de importar jsPDF
import 'jspdf-autotable'; // Importar autoTable para crear tablas en el PDF
import '../styles/Pagination.css'; // Archivo CSS para los estilos

function Pagination({ 
  totalRegistros, 
  registrosPorPagina, 
  paginaActual, 
  setPaginaActual, 
  registros, 
  exportFields // Claves de los campos a exportar
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
    const excelData = registros.map(record => {
      const exportData = {};
      exportFields.forEach(field => {
        exportData[field] = record[field];
      });
      return exportData;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
    XLSX.writeFile(workbook, 'registros.xlsx');
  };

  const handlePdfDownload = () => {
    const doc = new jsPDF();
    doc.text("Registros", 10, 10);

    const pdfData = registros.map(record => {
      return exportFields.map(field => record[field]);
    });

    doc.autoTable({
      head: [exportFields], // Usar las claves de exportación como encabezados
      body: pdfData,
      startY: 20, // Comenzar a dibujar la tabla desde esta posición Y
    });

    doc.save('registros.pdf');
  };

  const handleSqlDownload = () => {
    const sqlStatements = registros.map((registro) => {
      const values = exportFields.map(field => `'${registro[field]}'`).join(', ');
      return `INSERT INTO tu_tabla (${exportFields.join(', ')}) VALUES (${values});`;
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
            <div className="icon-item" onClick={handleExcelDownload} title="Descargar en Excel">
              <span className="pi pi-file-excel"></span>
            </div>
            <div className="icon-item" onClick={handlePdfDownload} title="Descargar en PDF">
              <span className="pi pi-file-pdf"></span>
            </div>
            <div className="icon-item" onClick={handleSqlDownload} title="Descargar en SQL">
              <span className="pi pi-file-sql"></span> {/* Icono SQL */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
