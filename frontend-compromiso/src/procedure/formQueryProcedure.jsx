// FormQueryProcedure.jsx
import React, { useState } from 'react';

const FormQueryProcedure = ({ procedureQuery, setProcedureQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setProcedureQuery(procedureQuery); // Mostrar todos los procedimientos si el término de búsqueda está vacío
    } else {
      const filteredProcedures = procedureQuery.filter((procedure) =>
        procedure.Nom_Procedimiento.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProcedureQuery(filteredProcedures);
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

export default FormQueryProcedure;
