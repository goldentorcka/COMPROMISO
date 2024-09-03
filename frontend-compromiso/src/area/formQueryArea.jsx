import React, { useState } from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

const FormQueryArea = ({ areaQuery, setAreaQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setAreaQuery(areaQuery); // Mostrar todas las áreas si el término de búsqueda está vacío
    } else {
      const filteredAreas = areaQuery.filter((area) =>
        area.Nom_Area.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAreaQuery(filteredAreas);
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

export default FormQueryArea;
