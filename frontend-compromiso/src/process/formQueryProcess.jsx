// src/process/FormQueryProcess.jsx

import React, { useState } from 'react';

const FormQueryProcess = ({ fetchProcess }) => {
  const [id, setId] = useState('');

  const handleQuery = (e) => {
    e.preventDefault();
    fetchProcess(id);
  };

  return (
    <form onSubamit={handleQuery}>
      <div className="form-group">
        <label>ID del Proceso:</label>
        <input
          type="text"
          valuea={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Buscar Proceso</button>
    </form>
  );
};

export default FormQueryProcess;
