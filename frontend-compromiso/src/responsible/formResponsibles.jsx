import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const FormResponsables = ({ responsable, handleSubmit, buttonForm }) => {
  const [nomResponsable, setNomResponsable] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);

  // Efecto para cargar los datos del responsable cuando se recibe uno nuevo
  useEffect(() => {
    if (responsable) {
      setNomResponsable(responsable.Nom_Responsable || '');
      setEstado(responsable.estado || 'Activo');
      setId(responsable.Id_Responsable || null);
    } else {
      resetForm(); // Resetear si no hay responsable
    }
  }, [responsable]);

  const validateForm = () => {
    const newErrors = {};
    if (!nomResponsable || nomResponsable.length < 3) {
      newErrors.nomResponsable = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id, // Incluir el ID en el objeto de envío
        Nom_Responsable: nomResponsable,
        estado
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNomResponsable('');
    setEstado('Activo');
    setId(null); // Resetear ID
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Responsable */}
        <div className="form-group">
          <label htmlFor="nomResponsable">
            <FontAwesomeIcon icon={faUser} /> Nombre del Responsable
          </label>
          <input
            id="nomResponsable"
            type="text"
            value={nomResponsable}
            onChange={(e) => setNomResponsable(e.target.value)}
            required
            aria-describedby="nomResponsableError"
          />
          {errors.nomResponsable && (
            <span id="nomResponsableError" className="error">
              {errors.nomResponsable}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* ID del Responsable (oculto) */}
        {id && (
          <input type="hidden" value={id} />
        )}

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormResponsables;
