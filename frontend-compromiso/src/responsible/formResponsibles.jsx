import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const FormResponsables = ({ responsable, handleSubmit, buttonForm }) => {
  const [Nom_Responsable, setNom_Responsable] = useState('');
  const [Estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});

  // Efecto para cargar los datos del responsable cuando se recibe uno nuevo
  useEffect(() => {
    if (responsable) {
      setNom_Responsable(responsable.Nom_Responsable || ''); // Asegúrate de que el campo existe
      setEstado(responsable.estado || 'Activo'); // Establece el estado por defecto
    }
  }, [responsable]);

  const validateForm = () => {
    const newErrors = {};

    if (!Nom_Responsable || Nom_Responsable.length < 3) {
      newErrors.Nom_Responsable = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Aquí se llama a preventDefault en el evento
    if (validateForm()) {
      handleSubmit(e, { // Pasa el evento junto con los datos
        Nom_Responsable,
        estado: Estado
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setNom_Responsable('');
    setEstado('Activo');
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Responsable */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Nombre del Responsable</label>
          <input
            type="text"
            value={Nom_Responsable}
            onChange={(e) => setNom_Responsable(e.target.value)}
            required
          />
          {errors.Nom_Responsable && <span className="error">{errors.Nom_Responsable}</span>}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label>Estado</label>
          <select
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormResponsables;
