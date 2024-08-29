import React, {useState, useEffect} from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import {ReactSession} from 'react-client-session';
import '../css/stylesFormUsers.css';
import Swal from 'sweetalert2';

const FormUsers = ({buttonForm, user, updateTextButton, getAllUsers}) => {
  const [Nombre, setNombre] = useState ('');
  const [Apellido, setApellido] = useState ('');
  const [Codigo, setCodigo] = useState ('');
  const [Email, setEmail] = useState ('');
  const [Telefono, setTelefono] = useState ('');
  const [Fecha, setFecha] = useState ('');
  const [Estado, setEstado] = useState ('Sí'); // Valor por defecto
  const [Rol, setRol] = useState ('Administrador');
  const [Password, setPassword] = useState (''); // Campo para la contraseña
  const [alerta, setAlerta] = useState ({});
  const [message, setMessage] = useState ('');
  const [messageType, setMessageType] = useState ('');

  useEffect (
    () => {
      if (user) {
        setNombre (user.Nom_Usuario);
        setApellido (user.Ape_Usuario);
        setCodigo (user.Cod_Usuario);
        setEmail (user.Cor_Usuario);
        setTelefono (user.Nde_Usuario);
        setFecha (user.Fec_Usuario);
        setEstado (user.estado);
        setRol (user.rol);
      }
    },
    [user]
  );

  useEffect (
    () => {
      if (message) {
        const timer = setTimeout (() => {
          setMessage ('');
          setMessageType ('');
        }, 5000);

        return () => clearTimeout (timer);
      }
    },
    [message]
  );

  const sendForm = async e => {
    e.preventDefault ();
    const token = ReactSession.get ('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let responseApi;
      const userData = {
        Nom_Usuario: Nombre,
        Ape_Usuario: Apellido,
        Cod_Usuario: Codigo,
        Cor_Usuario: Email,
        Nde_Usuario: Telefono,
        Fec_Usuario: Fecha,
        estado: Estado,
        rol: Rol,
        password: Password, // Añadimos el campo de contraseña
      };

      if (buttonForm === 'Actualizar') {
        responseApi = await clienteAxios.put (
          `/api/users/${user.id}`,
          userData,
          config
        );
        setMessage ('Usuario actualizado correctamente');
        setMessageType ('success');
      } else {
        responseApi = await clienteAxios.post ('/api/users', userData, config);
        setMessage ('Usuario creado correctamente');
        setMessageType ('success');
      }

      getAllUsers (); // Llamamos a la función para obtener todos los usuarios
      resetForm ();
    } catch (error) {
      setMessage ('Error al procesar la solicitud');
      setMessageType ('error');
    }
  };

  const resetForm = () => {
    setNombre ('');
    setApellido ('');
    setCodigo ('');
    setEmail ('');
    setTelefono ('');
    setFecha ('');
    setEstado ('Sí');
    setRol ('Administrador');
    setPassword ('');
  };

  return (
    <div className="form-container">
      {message && <Alerta message={message} type={messageType} />}
      <form onSubmit={sendForm}>
        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={Nombre}
            onChange={e => setNombre (e.target.value)}
            className="w-full p-2 border rounded"
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
            onChange={e => setApellido (e.target.value)}
            className="w-full p-2 border rounded"
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
            onChange={e => setCodigo (e.target.value)}
            className="w-full p-2 border rounded"
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
            onChange={e => setEmail (e.target.value)}
            className="w-full p-2 border rounded"
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
            onChange={e => setTelefono (e.target.value)}
            className="w-full p-2 border rounded"
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
            onChange={e => setFecha (e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">Estado</label>
          <select
            id="estado"
            value={Estado}
            onChange={e => setEstado (e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un estado</option>
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={Password}
            onChange={e => setPassword (e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${buttonForm === 'Actualizar' ? 'bg-[#85c1e9] hover:bg-[#7db8d8]' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormUsers;
