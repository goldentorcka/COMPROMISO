import React, { useState } from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

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
