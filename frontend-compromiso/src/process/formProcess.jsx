import React from 'react';
import './FormProcesses.css'; // Asegúrate de que la ruta sea correcta

const FormProcesses = ({ handleSubmit, process, setProcess, buttonForm }) => {
  const handleChange = (e) => {
    setProcess({ ...process, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {buttonForm === "Actualizar" ? "Actualizar Proceso" : "Nuevo Proceso"}
      </h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Nombre del Proceso:</label>
          <input
            type="text"
            name="Nom_Proceso"
            value={process.Nom_Proceso || ''}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            name="description"
            value={process.description || ''}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            name="date"
            value={process.date || ''}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Estado:</label>
          <input
            type="text"
            name="status"
            value={process.status || ''}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormProcesses;
