import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormProcess = ({ proceso, handleSubmit, buttonForm }) => {
  const [nomProceso, setNomProceso] = useState('');
  const [tipProceso, setTipProceso] = useState(''); 
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);

  // Opciones para el tipo de proceso
  const tiposProceso = [
    { value: '', label: 'Seleccione un tipo de proceso' },
    { value: 'Proceso de Innovacion', label: 'Proceso de Innovación' },
    { value: 'Proceso de Valor', label: 'Proceso de Valor' },
    { value: 'Proceso de Apoyo', label: 'Proceso de Apoyo' },
  ];

  // Efecto para cargar los datos del proceso cuando se recibe uno nuevo
  useEffect(() => {
    if (proceso) {
      setNomProceso(proceso.Nom_Proceso || '');
      setTipProceso(proceso.Tip_Proceso || '');
      setEstado(proceso.estado || 'Activo');
      setId(proceso.Id_Proceso || null);
    } else {
      resetForm(); // Resetear si no hay proceso
    }
  }, [proceso]);

  const validateForm = () => {
    const newErrors = {};
    if (!nomProceso || nomProceso.length < 3) {
      newErrors.nomProceso = 'El nombre del proceso es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!tipProceso) {
      newErrors.tipProceso = 'El tipo de proceso es obligatorio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validar que solo contenga letras para Nom_Proceso
    if (name === 'nomProceso' && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      return; // No permite caracteres no permitidos
    }

    // Actualizar el estado correspondiente
    if (name === 'nomProceso') {
      setNomProceso(value);
    } else if (name === 'tipProceso') {
      setTipProceso(value);
    } else {
      setEstado(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const processData = {
        id,
        Nom_Proceso: nomProceso,
        Tip_Proceso: tipProceso,
        estado,
      };

      // Llamar a la función handleSubmit
      handleSubmit(e, processData);
      resetForm();
    }
  };

  const resetForm = () => {
    setNomProceso('');
    setTipProceso('');
    setEstado('Activo');
    setId(null); // Resetear ID
    setErrors({});
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Nombre del Proceso */}
      <div className="form-group">
        <label htmlFor="nomProceso">Nombre del Proceso:</label>
        <input
          type="text"
          name="nomProceso"
          value={nomProceso}
          onChange={handleChange}
          required
          aria-describedby="nomProcesoError"
        />
        {errors.nomProceso && <span id="nomProcesoError" className="error">{errors.nomProceso}</span>}
      </div>

      {/* Tipo de Proceso */}
      <div className="form-group">
        <label htmlFor="tipProceso">Tipo de Proceso:</label>
        <select
          name="tipProceso"
          value={tipProceso}
          onChange={handleChange}
          required
        >
          {tiposProceso.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
        {errors.tipProceso && <span className="error">{errors.tipProceso}</span>}
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
        {buttonForm || 'Crear Proceso'}
      </button>
    </form>
  );
};

export default FormProcess;
