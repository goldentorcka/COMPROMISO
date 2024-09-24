// FormQueryProcess.jsx
import React, { useState } from 'react';
// import './styles.css'; // Asegúrate de importar el archivo CSS

const FormQueryProcess = ({ processQuery, setProcessQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setProcessQuery(processQuery); // Mostrar todos los procesos si el término de búsqueda está vacío
    } else {
      const filteredProcesses = processQuery.filter((process) =>
        process.Nom_Proceso.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProcessQuery(filteredProcesses);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="search-button"
      >
        Buscar
      </button>
    </div>
  );
};

export default FormQueryProcess;
