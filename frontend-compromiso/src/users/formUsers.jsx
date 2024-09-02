import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import { ReactSession } from 'react-client-session';
import '../css/stylesFormUsers.css';
import Swal from 'sweetalert2';

const FormUser = ({ buttonForm, user, getAllUsers }) => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [Email, setEmail] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Fecha, setFecha] = useState('');
  const [Estado, setEstado] = useState('Sí'); // Valor por defecto
  const [Rol, setRol] = useState('Administrador');
  const [Password, setPassword] = useState(''); // Campo para la contraseña
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (user) {
      setNombre(user.Nom_Usuario || '');
      setApellido(user.Ape_Usuario || '');
      setCodigo(user.Cod_Usuario || '');
      setEmail(user.Cor_Usuario || '');
      setTelefono(user.Nde_Usuario || '');
      setFecha(user.Fec_Usuario || '');
      setEstado(user.estado || 'Sí');
      setRol(user.rol || 'Administrador');
    }
  }, [user]);

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

    const userData = {
      Nom_Usuario: Nombre,
      Ape_Usuario: Apellido,
      Cod_Usuario: Codigo,
      Cor_Usuario: Email,
      Nde_Usuario: Telefono,
      Fec_Usuario: Fecha,
      estado: Estado,
      rol: Rol,
      password: Password,
    };

    try {
      let responseApi;
      if (buttonForm === 'Actualizar') {
        responseApi = await clienteAxios.put(`/usuarios/${user.id}`, userData, config);
        Swal.fire({
          title: 'Actualización Exitosa',
          text: 'Usuario actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      } else {
        responseApi = await clienteAxios.post('/usuarios', userData, config);
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }

      await getAllUsers(); // Asegúrate de que esta función sea una función asíncrona

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
    setApellido('');
    setCodigo('');
    setEmail('');
    setTelefono('');
    setFecha('');
    setEstado('Sí');
    setRol('Administrador');
    setPassword('');
  };

  return (
    <div className="form-container">
      {message && <Alerta message={message} type={messageType} />}
      <form onSubmit={sendForm} className="formUser">
        <h2 className="formTitle">Formulario de Usuario</h2>
        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Código</label>
          <input
            type="text"
            id="codigo"
            placeholder="Código"
            value={Codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
            required
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            placeholder="Teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="inputField"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Fecha de Registro
          </label>
          <input
            type="date"
            id="fecha"
            value={Fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="inputField"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Estado</label>
          <select
            id="estado"
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
            className="inputField"
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Rol</label>
          <input
            type="text"
            id="rol"
            placeholder="Rol"
            value={Rol}
            readOnly
            className="inputField"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField"
            required // Asegúrate de que la contraseña sea obligatoria si es necesario
          />
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

export default FormUser;
