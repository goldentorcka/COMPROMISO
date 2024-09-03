import React, { useState } from 'react';

const FormQueryResponsable = ({ responsableQuery, setResponsableQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setResponsableQuery(responsableQuery); // Mostrar todos los responsables si el término de búsqueda está vacío
    } else {
      const filteredResponsables = responsableQuery.filter((responsable) =>
        responsable.Nom_Responsable.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResponsableQuery(filteredResponsables);
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

export default FormQueryResponsable;
