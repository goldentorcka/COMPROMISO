import React from 'react';

const FormResponsables = ({ responsable, setResponsable, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Nom_Responsable' && (value.length < 3 || value.trim() === '')) {
      alert('Por favor, ingrese un nombre válido');
      return;
    }
    if (name === 'estado' && !['Activo', 'Inactivo'].includes(value)) {
      alert('Por favor, seleccione un estado válido');
      return;
    }
    setResponsable({
      ...responsable,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Responsable</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="Nom_Responsable"
          value={responsable.Nom_Responsable}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="estado" className="form-label">Estado</label>
        <select
          className="form-select"
          id="estado"
          name="estado"
          value={responsable.estado}
          onChange={handleChange}
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">{buttonForm}</button>
    </form>
  );
};

export default FormResponsables;