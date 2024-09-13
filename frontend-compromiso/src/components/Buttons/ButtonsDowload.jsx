import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileExcel, FaFilePdf, FaDatabase } from 'react-icons/fa';
import '../styles/buttons.css';

const DownloadButtons = ({ data, formType, title }) => {
  const extractImportantFields = (data) => {
    return data.map(({ Id_Responsable, Nom_Responsable, estado }) => ({
      Id_Responsable,
      Nom_Responsable,
      estado,
    }));
  };

  const downloadExcel = () => {
    const filteredData = extractImportantFields(data);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${formType}_data.xlsx`);
  };

  const downloadPDF = () => {
    const filteredData = extractImportantFields(data);
    const doc = new jsPDF();

    // Agrega el título en el PDF
    doc.setFontSize(18);
    doc.text(title, 14, 22);

    // Agrega la tabla justo debajo del título
    doc.autoTable({
      startY: 30, // La tabla comienza después del título
      head: [Object.keys(filteredData[0])],
      body: filteredData.map(item => Object.values(item)),
    });

    doc.save(`${formType}_data.pdf`);
  };

  const downloadSQL = () => {
    const filteredData = extractImportantFields(data);
    let sqlString = `CREATE TABLE ${formType}_data (\n  Id_Responsable INTEGER,\n  Nom_Responsable TEXT,\n  estado TEXT\n);\n\n`;

    sqlString += `INSERT INTO ${formType}_data (Id_Responsable, Nom_Responsable, estado) VALUES\n`;

    filteredData.forEach((row, index) => {
      const values = Object.values(row)
        .map(value => `'${value}'`) // Asegura que los valores estén entre comillas simples
        .join(', ');
      sqlString += `(${values})`;

      // Agrega una coma al final de cada fila excepto la última
      sqlString += (index !== filteredData.length - 1) ? ',\n' : ';\n';
    });

    const blob = new Blob([sqlString], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formType}_data.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="download-buttons">
      <button onClick={downloadExcel}>
        <FaFileExcel /> Excel
      </button>
      <button onClick={downloadPDF}>
        <FaFilePdf /> PDF
      </button>
      <button onClick={downloadSQL}>
        <FaDatabase /> SQL
      </button>
    </div>
  );
};

export default DownloadButtons;
