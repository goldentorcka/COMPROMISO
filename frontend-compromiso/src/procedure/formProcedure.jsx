// @ts-nocheck
import React, { useState, useEffect } from 'react';

const FormProcedure = ({ current, onSubmit }) => {
  const [formData, setFormData] = useState({
    Nom_Procedimiento: '',
    Id_Proceso: '',
    estado: 'Sí',
  });

  useEffect(() => {
    if (current) {
      setFormData({
        Nom_Procedimiento: current.Nom_Procedimiento,
        Id_Proceso: current.Id_Proceso,
        estado: current.estado,
      });
    } else {
      setFormData({
        Nom_Procedimiento: '',
        Id_Proceso: '',
        estado: 'Sí',
      });
    }
  }, [current]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-procedure">
      <h2>{current ? 'Editar Procedimiento' : 'Nuevo Procedimiento'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Procedimiento:</label>
          <input
            type="text"
            name="Nom_Procedimiento"
            value={formData.Nom_Procedimiento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID del Proceso:</label>
          <input
            type="number"
            name="Id_Proceso"
            value={formData.Id_Proceso}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            required
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          {current ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default FormProcedure;
