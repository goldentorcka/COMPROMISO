import { useState, useEffect } from "react";
import clieteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { ReactSession } from 'react-client-session';

const FormUsers = ({ buttonForm, user, updateTextButton, getAllUsers }) => {
  const [Nombre, setNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Estado, setEstado] = useState("");
  const [alerta, setAlerta] = useState({});

  // Estado para mensajes
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
        respuestApi = await clieteAxios.put(
          `/usuarios/${user.Id_Usuario}`,
          {
            Nombre,
            Email,
            Telefono,
            Estado,
          },
          config
        );
      } else if (buttonForm === "Enviar") {
        respuestApi = await clieteAxios.post(
          `/usuarios`,
          {
            Nombre,
            Email,
            Telefono,
            Estado,
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
    setNombre(user.Nombre);
    setEmail(user.Email);
    setTelefono(user.Telefono);
    setEstado(user.Estado);
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
            Registrar Usuarios
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
              Estado:
            </label>
            <select
              id="estado"
              value={Estado}
              onChange={(e) => setEstado(e.target.value)}
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            >
              <option value="">Seleccione un Estado:</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-around">
            <input
              type="submit"
              id="button"
              value={buttonForm}
              className="bg-green-600 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-700 md:w-auto"
            />
            <input
              type="button"
              id="button"
              value="Limpiar"
              onClick={() => clearForm()}
              className="bg-yellow-400 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-yellow-500 md:w-auto"
              aria-label="Limpiar"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormUsers;
