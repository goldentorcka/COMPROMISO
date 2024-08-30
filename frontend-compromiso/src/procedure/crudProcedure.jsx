import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormProcedure from './formProcedure.jsx';

const CrudProcedure = () => {
  const [procedimientos, setProcedimientos] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetchProcedimientos();
  }, []);

  const fetchProcedimientos = async () => {
    try {
      const response = await axios.get('/api/procedimientos');
      console.log('Procedimientos fetched:', response.data);
      if (Array.isArray(response.data)) {
        setProcedimientos(response.data);
      } else {
        console.error('La respuesta de la API no es un array');
        setProcedimientos([]); // Resetea el estado si la respuesta no es válida
      }
    } catch (error) {
      console.error('Error fetching procedimientos:', error);
      setProcedimientos([]); // Resetea el estado en caso de error
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (current) {
        await axios.put(`/api/procedimientos/${current.Id_Procedimiento}`, formData);
      } else {
        await axios.post('/api/procedimientos', formData);
      }
      fetchProcedimientos();
      setCurrent(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (procedimiento) => {
    setCurrent(procedimiento);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/procedimientos/${id}`);
      fetchProcedimientos();
    } catch (error) {
      console.error('Error deleting procedimiento:', error);
    }
  };

  return (
    <div className="crud-procedure-container">
      <h1>Gestión de Procedimientos</h1>
      <FormProcedure
        current={current}
        onSubmit={handleFormSubmit}
      />
      <table className="procedimiento-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>ID Proceso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(procedimientos) && procedimientos.length > 0 ? (
            procedimientos.map((procedimiento) => (
              <tr key={procedimiento.Id_Procedimiento}>
                <td>{procedimiento.Id_Procedimiento}</td>
                <td>{procedimiento.Nom_Procedimiento}</td>
                <td>{procedimiento.Id_Proceso}</td>
                <td>{procedimiento.estado}</td>
                <td>
                  <button onClick={() => handleEdit(procedimiento)}>Editar</button>
                  <button onClick={() => handleDelete(procedimiento.Id_Procedimiento)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudProcedure;
