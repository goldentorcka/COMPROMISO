import React, { useState } from 'react';

const FormQueryProcess = ({ setFilteredProcesses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      // Aquí deberías implementar la lógica de búsqueda real con tu API.
      // Ejemplo:
      // const filtered = allProcesses.filter(process => process.Nom_Proceso.includes(searchTerm));
      // setFilteredProcesses(filtered);
    } catch (error) {
      console.error("Error al buscar procesos:", error);
    }
  };

  return (
    <div className="form-query-process">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default FormQueryProcess;
