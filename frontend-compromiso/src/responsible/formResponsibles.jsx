import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const FormResponsables = ({ responsable, handleSubmit, buttonForm }) => {
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);

  // Efecto para cargar los datos del responsable cuando se recibe uno nuevo
  useEffect(() => {
    if (responsable) {
      setNombreResponsable(responsable.nombre_responsable || '');
      setEstado(responsable.estado || 'Activo');
      setId(responsable.id_responsable || null);
    } else {
      resetForm(); // Resetear si no hay responsable
    }
  }, [responsable]);

  const validateForm = () => {
    const newErrors = {};
    if (!nombreResponsable || nombreResponsable.length < 3) {
      newErrors.nombreResponsable = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id, // Incluir el ID en el objeto de envío
        nombre_responsable: nombreResponsable, // Cambiado a nombre_responsable
        estado
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNombreResponsable('');
    setEstado('Activo');
    setId(null); // Resetear ID
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Responsable */}
        <div className="form-group">
          <label htmlFor="nombreResponsable">
            <FontAwesomeIcon icon={faUser} /> Nombre del Responsable
          </label>
          <input
            id="nombreResponsable"
            type="text"
            value={nombreResponsable}
            onChange={(e) => setNombreResponsable(e.target.value)}
            required
            aria-describedby="nombreResponsableError"
          />
          {errors.nombreResponsable && (
            <span id="nombreResponsableError" className="error">
              {errors.nombreResponsable}
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
