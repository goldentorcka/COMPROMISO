import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';

const FormResponsables = ({ buttonForm, responsable, getAllResponsables }) => {
  const [Nom_Responsable, setNom_Responsable] = useState('');
  const [estado, setEstado] = useState('Sí'); // Valor por defecto
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (responsable) {
      setNom_Responsable(responsable.Nom_Responsable || '');
      setEstado(responsable.estado || 'Sí');
    }
  }, [responsable]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const sendForm = async (e) => {
    e.preventDefault();
    const token = ReactSession.get('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const responsableData = {
      Nom_Responsable,
      estado,
    };

    try {
      let responseApi;
      if (buttonForm === 'Actualizar') {
        responseApi = await clienteAxios.put(`/responsables/${responsable.id}`, responsableData, config);
        Swal.fire({
          title: 'Actualización Exitosa',
          text: 'Responsable actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        responseApi = await clienteAxios.post('/responsables', responsableData, config);
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Responsable registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }

      // Actualiza la tabla con los datos más recientes
      await getAllResponsables(); // Asegúrate de que esta función sea una función asíncrona

      // Limpia el formulario después de la actualización o registro
      resetForm();
    } catch (error) {
      console.error('Error en la solicitud:', error); // Añadido para depuración
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Error al procesar la solicitud'}`);
      } else if (error.request) {
        setMessage('Error: No se recibió respuesta del servidor');
      } else {
        setMessage('Error al procesar la solicitud');
      }
      setMessageType('error');
    }
  };

  const resetForm = () => {
    setNom_Responsable('');
    setEstado('Sí');
  };

  return (
    <div className="form-container">
      {message && <Alerta message={message} type={messageType} />}
      <form onSubmit={sendForm} className="formResponsable">
        <h2 className="formTitle">Formulario de Responsable</h2>
        
        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Nombre del Responsable</label>
          <input
            type="text"
            id="nom_responsable"
            placeholder="Nombre del Responsable"
            value={Nom_Responsable}
            onChange={(e) => setNom_Responsable(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="inputField"
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <button
          type="submit"
          className={`submitButton ${buttonForm === 'Actualizar' ? 'updateButton' : 'createButton'}`}
        >
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormResponsables;
