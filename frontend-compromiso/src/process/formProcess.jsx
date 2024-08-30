import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import { ReactSession } from 'react-client-session';
import '../css/stylesFormUsers.css';
import Swal from 'sweetalert2';

const FormProcesses = ({ buttonForm, proceso, setProceso, getAllProcesos }) => {
  const [Nombre, setNombre] = useState('');
  const [Responsable, setResponsable] = useState('');
  const [Estado, setEstado] = useState('Sí'); // Valor por defecto
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (proceso) {
      setNombre(proceso.Nom_Proceso || '');
      setResponsable(proceso.Id_Responsable || '');
      setEstado(proceso.estado || 'Sí');
    }
  }, [proceso]);

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

    const procesoData = {
      Nom_Proceso: Nombre,
      Id_Responsable: Responsable,
      estado: Estado,
    };

    try {
      let responseApi;
      if (buttonForm === 'Actualizar') {
        responseApi = await clienteAxios.put(`/procesos/${proceso.Id_Proceso}`, procesoData, config);
        Swal.fire({
          title: 'Actualización Exitosa',
          text: 'Proceso actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        responseApi = await clienteAxios.post('/procesos', procesoData, config);
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Proceso registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }

      // Actualiza la tabla con los datos más recientes
      await getAllProcesos(); // Asegúrate de que esta función sea una función asíncrona

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
    setNombre('');
    setResponsable('');
    setEstado('Sí'); // Valor por defecto
  };

  return (
    <div className="formContainer">
      <h2 className="formTitle">{buttonForm === 'Actualizar' ? 'Actualizar Proceso' : 'Agregar Proceso'}</h2>
      {alerta.message && <Alerta message={alerta.message} type={alerta.type} />}
      <form onSubmit={sendForm} className="form">
        <div className="formGroup">
          <label htmlFor="Nombre">Nombre del Proceso</label>
          <input
            type="text"
            id="Nombre"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="Responsable">ID del Responsable</label>
          <input
            type="number"
            id="Responsable"
            value={Responsable}
            onChange={(e) => setResponsable(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="Estado">Estado</label>
          <select
            id="Estado"
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="submitButton">{buttonForm}</button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default FormProcesses;
