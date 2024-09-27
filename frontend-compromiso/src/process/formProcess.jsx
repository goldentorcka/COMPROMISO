import React, { useState } from 'react';
import axios from 'axios';

const FormProcess = () => {
  const [process, setProcess] = useState({
    Nom_Proceso: '',
    Tip_Proceso: '',
    estado: 'Activo', // Asumiendo que este es un valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que solo contenga letras
    if (name === 'Nom_Proceso' && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
      return; // No permite caracteres no permitidos
    }

    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/procesos', process);
      console.log('Proceso creado:', response.data);
      // Resetear el formulario o manejar el éxito según sea necesario
    } catch (error) {
      console.error('Error al crear el proceso:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Nom_Proceso">Nombre del Proceso:</label>
        <input
          type="text"
          name="Nom_Proceso"
          value={process.Nom_Proceso}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="Tip_Proceso">Tipo de Proceso:</label>
        <input
          type="text"
          name="Tip_Proceso"
          value={process.Tip_Proceso}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <select name="estado" value={process.estado} onChange={handleChange}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit">Crear Proceso</button>
    </form>
  );
};

export default FormProcess;
