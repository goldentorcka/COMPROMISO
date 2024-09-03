// FormProcedures.jsx
import React from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

const FormProcedures = ({ procedure, setProcedure, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedure((prevProcedure) => ({
      ...prevProcedure,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Procedimiento">Nombre del Procedimiento</label>
        <input
          type="text"
          id="Nom_Procedimiento"
          name="Nom_Procedimiento"
          value={procedure.Nom_Procedimiento}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Proceso">ID Proceso</label>
        <input
          type="number"
          id="Id_Proceso"
          name="Id_Proceso"
          value={procedure.Id_Proceso}
          onChange={handleChange}
          className="search-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={procedure.estado}
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

export default FormProcedures;
