import React, { useEffect, useState } from 'react';

const FormProcedure = ({ procedimiento, handleSubmit, buttonForm, processes = [] }) => {
  const [nombreProcedimiento, setNombreProcedimiento] = useState('');
  const [idProceso, setIdProceso] = useState('');
  const [nombreDirectorioProcedimiento, setNombreDirectorioProcedimiento] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [idProcedimiento, setIdProcedimiento] = useState(null);

  // Efecto para cargar los datos del procedimiento cuando se recibe uno nuevo
  useEffect(() => {
    if (procedimiento) {
      setNombreProcedimiento(procedimiento.nombre_procedimiento || '');
      setIdProceso(procedimiento.id_proceso || '');
      setNombreDirectorioProcedimiento(procedimiento.nombre_directorio_procedimiento || '');
      setEstado(procedimiento.estado || 'Activo');
      setIdProcedimiento(procedimiento.id_procedimiento || null);
    } else {
      resetForm(); // Resetear si no hay procedimiento
    }
  }, [procedimiento]);

  const validateForm = () => {
    const newErrors = {};
    if (!nombreProcedimiento || nombreProcedimiento.length < 3) {
      newErrors.nombreProcedimiento = 'El nombre del procedimiento es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!idProceso) {
      newErrors.idProceso = 'Debes seleccionar un proceso.';
    }
    if (!nombreDirectorioProcedimiento || nombreDirectorioProcedimiento.length < 3) {
      newErrors.nombreDirectorioProcedimiento = 'El directorio es obligatorio y debe tener al menos 3 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, el formulario es válido
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombreProcedimiento' && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      return; // No permite caracteres no permitidos
    }

    switch (name) {
      case 'nombreProcedimiento':
        setNombreProcedimiento(value);
        break;
      case 'idProceso':
        setIdProceso(value);
        break;
      case 'nombreDirectorioProcedimiento':
        setNombreDirectorioProcedimiento(value);
        break;
      default:
        setEstado(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id_procedimiento: idProcedimiento, // Incluir el ID si es necesario
        nombre_procedimiento: nombreProcedimiento,
        id_proceso: idProceso,
        nombre_directorio_procedimiento: nombreDirectorioProcedimiento,
        estado,
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setNombreProcedimiento('');
    setIdProceso('');
    setNombreDirectorioProcedimiento('');
    setEstado('Activo');
    setIdProcedimiento(null); // Resetear ID
    setErrors({}); // Limpiar errores
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Procedimiento */}
        <div className="form-group">
          <label htmlFor="nombreProcedimiento">Nombre del Procedimiento:</label>
          <input
            id="nombreProcedimiento"
            type="text"
            name="nombreProcedimiento"
            value={nombreProcedimiento}
            onChange={handleChange}
            required
            aria-describedby="nombreProcedimientoError"
          />
          {errors.nombreProcedimiento && (
            <span id="nombreProcedimientoError" className="error">
              {errors.nombreProcedimiento}
            </span>
          )}
        </div>

        {/* Selección de Proceso */}
        <div className="form-group">
          <label htmlFor="idProceso">Proceso:</label>
          <select
            id="idProceso"
            name="idProceso"
            value={idProceso}
            onChange={handleChange}
            required
            aria-describedby="idProcesoError"
          >
            <option value="">Seleccione un proceso</option>
            {processes.map((process) => (
              <option key={process.id_proceso} value={process.id_proceso}>
                {process.nombre_proceso}
              </option>
            ))}
          </select>
          {errors.idProceso && (
            <span id="idProcesoError" className="error">
              {errors.idProceso}
            </span>
          )}
        </div>

        {/* Nombre del Directorio del Procedimiento */}
        <div className="form-group">
          <label htmlFor="nombreDirectorioProcedimiento">Nombre del Directorio:</label>
          <input
            id="nombreDirectorioProcedimiento"
            type="text"
            name="nombreDirectorioProcedimiento"
            value={nombreDirectorioProcedimiento}
            onChange={handleChange}
            required
            aria-describedby="nombreDirectorioProcedimientoError"
          />
          {errors.nombreDirectorioProcedimiento && (
            <span id="nombreDirectorioProcedimientoError" className="error">
              {errors.nombreDirectorioProcedimiento}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* ID del Procedimiento (oculto) */}
        {idProcedimiento && (
          <input type="hidden" value={idProcedimiento} />
        )}

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormProcedure;
