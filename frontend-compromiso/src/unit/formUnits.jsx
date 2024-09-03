import React from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS

const FormUnits = ({ unit, setUnit, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnit((prevUnit) => ({
      ...prevUnit,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Unidad">Nombre de la Unidad</label>
        <input
          type="text"
          id="Nom_Unidad"
          name="Nom_Unidad"
          value={unit.Nom_Unidad}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Area">Área</label>
        <input
          type="number"
          id="Id_Area"
          name="Id_Area"
          value={unit.Id_Area}
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
          value={unit.estado}
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

export default FormUnits;
