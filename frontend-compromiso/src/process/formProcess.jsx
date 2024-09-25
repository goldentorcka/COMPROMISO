import React from 'react';

const FormProcess = ({ process, setProcess, handleSubmit, buttonForm }) => {
  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* Campo para Nombre del Proceso */}
      <div className="form-group">
        <label htmlFor="Nom_Proceso">Nombre del Proceso</label>
        <input
          type="text"
          id="Nom_Proceso"
          name="Nom_Proceso"
          value={process.Nom_Proceso || ''}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>

      {/* Campo para Tipo de Proceso */}
      <div className="form-group">
        <label htmlFor="Tip_Proceso">Tipo de Proceso</label>
        <select
          id="Tip_Proceso"
          name="Tip_Proceso"
          value={process.Tip_Proceso || ''}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="">Seleccionar Tipo de Proceso</option>
          <option value="Proceso de Innovacion">Proceso de Innovación</option>
          <option value="Proceso de Valor">Proceso de Valor</option>
          <option value="Proceso de Apoyo">Proceso de Apoyo</option>
        </select>
      </div>

      {/* Campo para Estado del Proceso */}
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={process.estado || ''}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="">Seleccionar Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormProcess;
