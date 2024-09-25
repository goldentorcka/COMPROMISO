import React, { useState } from 'react';

const FormProcedures = ({ procedure, setProcedure, handleSubmit, buttonForm, processes }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validación del nombre del procedimiento
    if (!procedure.Nom_Procedimiento) {
      newErrors.Nom_Procedimiento = 'El nombre del procedimiento es obligatorio.';
    }

    // Validación del proceso seleccionado
    if (!procedure.Id_Proceso) {
      newErrors.Id_Proceso = 'Debes seleccionar un proceso.';
    }

    // Validación del estado
    if (!procedure.estado) {
      newErrors.estado = 'El estado es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, el formulario es válido
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(procedure); // Enviar procedimiento si es válido
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setProcedure({
      Nom_Procedimiento: '',
      Id_Proceso: '',
      estado: 'Sí',
    });
    setErrors({}); // Limpiar errores
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedure((prevProcedure) => ({
      ...prevProcedure,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form">
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
        {errors.Nom_Procedimiento && <span className="error">{errors.Nom_Procedimiento}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="Id_Proceso">Proceso</label>
        <select
          id="Id_Proceso"
          name="Id_Proceso"
          value={procedure.Id_Proceso}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="">Seleccionar Proceso</option>
          {processes.length > 0 ? (
            processes.map((process) => (
              <option key={process.Id_Proceso} value={process.Id_Proceso}>
                {process.Nom_Proceso}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Cargando procesos...
            </option>
          )}
        </select>
        {errors.Id_Proceso && <span className="error">{errors.Id_Proceso}</span>}
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
        {errors.estado && <span className="error">{errors.estado}</span>}
      </div>
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormProcedures;
