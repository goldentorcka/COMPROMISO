import React, { useState, useEffect } from 'react';
import './styles.css'; // Asegúrate de importar el archivo CSS
import clienteAxios from '../api'; // Ajusta la ruta según la ubicación de tu archivo api.js

const FormProcess = ({ process, setProcess, handleSubmit, buttonForm }) => {
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await clienteAxios.get('/api/responsables'); // Asegúrate de que la ruta sea correcta
        setResponsables(response.data);
      } catch (error) {
        console.error('Error al obtener responsables:', error);
      }
    };

    fetchResponsables();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="Nom_Proceso">Nombre del Proceso</label>
        <input
          type="text"
          id="Nom_Proceso"
          name="Nom_Proceso"
          value={process.Nom_Proceso}
          onChange={handleChange}
          className="search-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Id_Responsable">Responsable</label>
        <select
          id="Id_Responsable"
          name="Id_Responsable"
          value={process.Id_Responsable}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="">Seleccionar Responsable</option>
          {responsables.map((responsable) => (
            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
              {responsable.Nom_Responsable}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={process.estado}
          onChange={handleChange}
          className="search-input"
          required
        >
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit" className="submit-button">
        {buttonForm}
      </button>
    </form>
  );
};

export default FormProcess;
