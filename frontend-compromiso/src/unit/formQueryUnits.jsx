import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const FormQueryUnit = ({ unitQuery, setUnitQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setUnitQuery(unitQuery); // Mostrar todas las unidades si el término de búsqueda está vacío
    } else {
      const filteredUnits = unitQuery.filter((unit) =>
        unit.Nom_Unidad.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUnitQuery(filteredUnits);
    }
  };

  return (
    <div className="search-wrapper">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
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

export default FormQueryUnit;
