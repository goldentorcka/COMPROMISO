// FormProcess.jsx
import React from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

const FormProcess = ({ process, setProcess, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Proceso">Nombre del Proceso</label>
        <input
          type="text"
          id="Nom_Proceso"
          name="Nom_Proceso"
          value={process.Nom_Proceso}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Responsable">ID del Responsable</label>
        <input
          type="text"
          id="Id_Responsable"
          name="Id_Responsable"
          value={process.Id_Responsable}
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={process.estado}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormProcess;
