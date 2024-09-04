import React from 'react';

const FormResponsables = ({ responsable, setResponsable }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponsable({
      ...responsable,
      [name]: value
    });
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre del Responsable</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={responsable.nombre}
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
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
    </form>
  );
};

export default FormResponsables;
