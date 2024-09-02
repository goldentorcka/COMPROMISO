// src/components/FormFormatos.jsx
import React from 'react';

const FormFormatos = ({ formato, setFormato, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormato({ ...formato, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Código:
        <input
          type="text"
          name="Cod_Formato"
          value={formato.Cod_Formato}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fecha Actualización:
        <input
          type="date"
          name="Fec_Actualizacion"
          value={formato.Fec_Actualizacion}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Versión:
        <input
          type="text"
          name="Ver_Formato"
          value={formato.Ver_Formato}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Estado:
        <select
          name="Est_Formato"
          value={formato.Est_Formato}
          onChange={handleChange}
          required
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </label>
      <label>
        Nombre:
        <input
          type="text"
          name="Nom_Formato"
          value={formato.Nom_Formato}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Nombre Magnético:
        <input
          type="text"
          name="Nom_Magnetico"
          value={formato.Nom_Magnetico}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Responsable:
        <input
          type="number"
          name="Id_Responsable"
          value={formato.Id_Responsable}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Procedimiento:
        <input
          type="number"
          name="Id_Procedimiento"
          value={formato.Id_Procedimiento}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Unidad:
        <input
          type="number"
          name="Id_Unidad"
          value={formato.Id_Unidad}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{buttonForm}</button>
    </form>
  );
};

export default FormFormatos;
