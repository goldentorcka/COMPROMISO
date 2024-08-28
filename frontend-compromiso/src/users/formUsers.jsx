import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alert/Alerta.jsx';
import { ReactSession } from 'react-client-session';
import '../css/stylesFormUsers.css';
import Swal from 'sweetalert2';

const FormUsers = ({ buttonForm, user, updateTextButton, getAllUsers }) => {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Codigo, setCodigo] = useState("");
  const [Email, setEmail] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Fecha, setFecha] = useState("");
  const [Estado, setEstado] = useState("");
  const [Rol, setRol] = useState("Administrador");
  const [Password, setPassword] = useState(""); // Campo para la contraseña
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const sendForm = async (e) => {
    e.preventDefault();
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let responseApi;
      if (buttonForm === "Actualizar") {
        responseApi = await clienteAxios.put(
          `/usuarios/${user.Id_Usuario}`,
          {
            Nom_Usuario: Nombre,
            Ape_Usuario: Apellido,
            Cod_Usuario: Codigo,
            Cor_Usuario: Email,
            Nde_Usuario: Telefono,
            Fec_Usuario: Fecha,
            estado: Estado,
            rol: Rol,
            password: Password, // Añadimos el campo de contraseña
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        responseApi = await clienteAxios.post(
          `/usuarios`,
          {
            Nom_Usuario: Nombre,
            Ape_Usuario: Apellido,
            Cod_Usuario: Codigo,
            Cor_Usuario: Email,
            Nde_Usuario: Telefono,
            Fec_Usuario: Fecha,
            estado: Estado,
            rol: Rol,
            password: Password, // Añadimos el campo de contraseña
          },
          config
        );
      }

      if (responseApi.status === 201 || responseApi.status === 200) {
        setMessage("Usuario registrado correctamente!");
        setMessageType("success");
        clearForm();
        getAllUsers();
        updateTextButton("Enviar");
        if (buttonForm === "Actualizar") {
          Swal.fire(
            'Actualizado!',
            'El usuario ha sido actualizado.',
            'success'
          );
        }
      } else {
        setMessage(responseApi.error.message || "Error al registrar el usuario.");
        setMessageType("error");
      }
    } catch (error) {
      setAlerta({
        msg: "Hubo un error, intenta nuevamente.",
        error: true,
      });
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setNombre("");
    setApellido("");
    setCodigo("");
    setEmail("");
    setTelefono("");
    setFecha("");
    setEstado("");
    setPassword(""); // Limpiar campo de contraseña
  };

  const setData = () => {
    if (user) {
      setNombre(user.Nom_Usuario);
      setApellido(user.Ape_Usuario);
      setCodigo(user.Cod_Usuario);
      setEmail(user.Cor_Usuario);
      setTelefono(user.Nde_Usuario);
      setFecha(user.Fec_Usuario ? user.Fec_Usuario.split('T')[0] : "");
      setEstado(user.estado === 'Sí' ? 'Sí' : 'No');
      setRol(user.rol || "Administrador");
      setPassword(""); // No mostramos la contraseña
    }
  };

  useEffect(() => {
    setData();
  }, [user]);

  const { msg } = alerta;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
      <form
        id="userForm"
        onSubmit={sendForm}
        className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
      >
        {msg && <Alerta alerta={alerta} />}
        <h1 className="font-bold text-[#85c1e9] text-3xl uppercase text-center my-5">
          {buttonForm === "Actualizar" ? "Actualizar Usuario" : "Registrar Usuario"}
        </h1>

        {message && (
          <div className={`p-4 mb-4 text-white rounded-md ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
          </div>
        )}

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Código
          </label>
          <input
            type="text"
            id="codigo"
            placeholder="Código"
            value={Codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            placeholder="Teléfono"
            value={Telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Estado
          </label>
          <select
            id="estado"
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un estado</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="text-gray-700 uppercase font-bold">
            Rol
          </label>
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
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${buttonForm === "Actualizar" ? 'bg-[#85c1e9] hover:bg-[#7db8d8]' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormUsers;
