import React from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

const FormResponsables = ({ responsable, setResponsable, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsable((prevResponsable) => ({
      ...prevResponsable,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Responsable">Nombre del Responsable</label>
        <input
          type="text"
          id="Nom_Responsable"
          name="Nom_Responsable"
          value={responsable.Nom_Responsable}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={responsable.estado}
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

export default FormResponsables;
