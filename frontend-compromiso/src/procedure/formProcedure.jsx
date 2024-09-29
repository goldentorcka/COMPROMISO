import React, { useEffect, useState } from 'react';

const FormProcedure = ({ procedimiento, handleSubmit, buttonForm, processes = [] }) => {
  const [nomProcedimiento, setNomProcedimiento] = useState('');
  const [idProceso, setIdProceso] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null); // Para manejar el ID del procedimiento si es necesario

  useEffect(() => {
    if (procedimiento) {
      setNomProcedimiento(procedimiento.Nom_Procedimiento || '');
      setIdProceso(procedimiento.Id_Proceso || '');
      setEstado(procedimiento.estado || 'Activo');
      setId(procedimiento.Id_Procedimiento || null);
    } else {
      resetForm(); // Resetear si no hay procedimiento
    }
  }, [procedimiento]);

  const validateForm = () => {
    const newErrors = {};
    if (!nomProcedimiento || nomProcedimiento.length < 3) {
      newErrors.nomProcedimiento = 'El nombre del procedimiento es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!idProceso) {
      newErrors.idProceso = 'Debes seleccionar un proceso.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, el formulario es válido
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nomProcedimiento' && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      return; // No permite caracteres no permitidos
    }

    if (name === 'nomProcedimiento') {
      setNomProcedimiento(value);
    } else if (name === 'idProceso') {
      setIdProceso(value);
    } else {
      setEstado(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id, // Incluir el ID si es necesario
        Nom_Procedimiento: nomProcedimiento,
        Id_Proceso: idProceso,
        estado,
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setNomProcedimiento('');
    setIdProceso('');
    setEstado('Activo');
    setId(null); // Resetear ID
    setErrors({}); // Limpiar errores
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div>
          <label>Nombre del Procedimiento:</label>
          <input
            type="text"
            name="nomProcedimiento"
            value={nomProcedimiento}
            onChange={handleChange}
            required
          />
          {errors.nomProcedimiento && <span className="error">{errors.nomProcedimiento}</span>}
        </div>

        <div>
          <label>Proceso:</label>
          <select
            name="idProceso"
            value={idProceso}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un proceso</option>
            {processes.map((process) => (
              <option key={process.Id_Proceso} value={process.Id_Proceso}>
                {process.Nom_Proceso}
              </option>
            ))}
          </select>
          {errors.idProceso && <span className="error">{errors.idProceso}</span>}
        </div>

        <div>
          <label>Estado:</label>
          <select name="estado" value={estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit">{buttonForm}</button>
      </form>
    </div>
  );
};

export default FormProcedure;
