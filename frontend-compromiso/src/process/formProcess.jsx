import React from 'react';

const FormProcesses = ({ handleSubmit, proceso, setProceso, buttonForm }) => {
  const handleChange = (e) => {
    setProceso({ ...proceso, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{buttonForm === "Actualizar" ? "Actualizar Proceso" : "Nuevo Proceso"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Proceso:</label>
          <input
            type="text"
            name="Nom_Proceso"
            value={proceso.Nom_Proceso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Responsable:</label>
          <input
            type="text"
            name="Id_Responsable"
            value={proceso.Id_Responsable}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select
            name="estado"
            value={proceso.estado}
            onChange={handleChange}
            required
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit">{buttonForm}</button>
      </form>
    </div>
  );
};

export default FormProcesses;
