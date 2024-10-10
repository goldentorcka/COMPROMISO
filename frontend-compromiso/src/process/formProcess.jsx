import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormProcess = ({ proceso, handleSubmit, buttonForm }) => {
  const [nombreProceso, setNombreProceso] = useState('');
  const [nombreDirectorioProceso, setNombreDirectorioProceso] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);

  // Efecto para cargar los datos del proceso cuando se recibe uno nuevo
  useEffect(() => {
    if (proceso) {
      setNombreProceso(proceso.nombre_proceso || '');
      setNombreDirectorioProceso(proceso.nombre_directorio_proceso || '');
      setEstado(proceso.estado || 'Activo');
      setId(proceso.id_proceso || null);
    } else {
      resetForm(); // Resetear si no hay proceso
    }
  }, [proceso]);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!nombreProceso || nombreProceso.length < 3) {
      newErrors.nombreProceso = 'El nombre del proceso es obligatorio y debe tener al menos 3 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // El formulario es válido si no hay errores
  };

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo contenga letras para nombre_proceso
    if (name === 'nombreProceso' && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      return; // No permite caracteres no permitidos
    }

    // Actualizar el estado correspondiente
    if (name === 'nombreProceso') {
      setNombreProceso(value);
    } else if (name === 'nombreDirectorioProceso') {
      setNombreDirectorioProceso(value);
    } else {
      setEstado(value);
    }
  };

  // Manejador del envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id, // Incluir el ID si es necesario
        nombre_proceso: nombreProceso,
        nombre_directorio_proceso: nombreDirectorioProceso,
        estado,
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setNombreProceso('');
    setNombreDirectorioProceso('');
    setEstado('Activo');
    setId(null); // Resetear ID
    setErrors({}); // Limpiar errores
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Proceso */}
        <div className="form-group">
          <label htmlFor="nombreProceso">Nombre del Proceso:</label>
          <input
            type="text"
            name="nombreProceso"
            value={nombreProceso}
            onChange={handleChange}
            required
            aria-describedby="nombreProcesoError"
          />
          {errors.nombreProceso && <span id="nombreProcesoError" className="error">{errors.nombreProceso}</span>}
        </div>

        {/* Nombre del Directorio del Proceso */}
        <div className="form-group">
          <label htmlFor="nombreDirectorioProceso">Nombre del Directorio del Proceso:</label>
          <input
            type="text"
            name="nombreDirectorioProceso"
            value={nombreDirectorioProceso}
            onChange={handleChange}
          />
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select name="estado" value={estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* ID del Proceso (oculto) */}
        {id && <input type="hidden" value={id} />}

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormProcess;
