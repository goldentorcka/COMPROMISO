import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { ReactSession } from 'react-client-session';
import '../css/stylesFormUsers.css';
import Swal from 'sweetalert2';

const FormUsers = ({ buttonForm, user, updateTextButton, getAllUsers }) => {
  const [Nombre, setNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Estado, setEstado] = useState("");
  const [alerta, setAlerta] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

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
      let respuestApi;
      if (buttonForm === "Actualizar") {
        respuestApi = await clienteAxios.put(
          `/usuarios/${user.Id_Usuario}`,
          {
            Nom_Usuario: Nombre,
            Cor_Usuario: Email,
            Nde_Usuario: Telefono,
            estado: Estado,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clienteAxios.post(
          `/usuarios`,
          {
            Nom_Usuario: Nombre,
            Cor_Usuario: Email,
            Nde_Usuario: Telefono,
            estado: Estado,
          },
          config
        );
      }

      if (respuestApi.status === 201 || respuestApi.status === 200) {
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
        setMessage(respuestApi.error.message || "Error al registrar el usuario.");
        setMessageType("error");
      }
    } catch (error) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      setMessageType("error");
    }
  };

  const clearForm = () => {
    setNombre("");
    setEmail("");
    setTelefono("");
    setEstado("");
  };

  const setData = () => {
    if (user) {
      setNombre(user.Nom_Usuario);
      setEmail(user.Cor_Usuario);
      setTelefono(user.Nde_Usuario);
      setEstado(user.estado);
    }
  };

  useEffect(() => {
    setData();
  }, [user]);

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 content-center w-full">
        <form
          id="userForm"
          onSubmit={sendForm}
          className="bg-white shadow-2xl rounded-2xl px-14 pt-6 pb-8 mb-4 max-w-3xl w-full mt-10"
        >
          {msg && <Alerta alerta={alerta} />}
          <h1 className="font-bold text-green-600 text-3xl uppercase text-center my-5">
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
              Estado
            </label>
            <select
              id="estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccione un estado</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded ${buttonForm === "Actualizar" ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {buttonForm}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormUsers;
