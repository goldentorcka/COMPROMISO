import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clienteAxios from "../config/axios.jsx"; // Asegúrate de tener la configuración del cliente Axios

const CreateAccount = () => {
  // Estados para manejar los datos del formulario
  const [Id_Usuario, setId_Usuario] = useState("");
  const [Nom_Usuario, setNom_Usuario] = useState("");
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if ([Id_Usuario, Nom_Usuario, Cor_Usuario, password, passwordRepeat].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== passwordRepeat) {
      setAlerta({ msg: "Las contraseñas no coinciden", error: true });
      return;
    }

    // Verificar que la contraseña tenga una longitud mínima
    if (password.length < 6) {
      setAlerta({ msg: "La contraseña debe tener al menos 6 caracteres", error: true });
      return;
    }

    setAlerta({}); // Limpiar alertas previas

    // Intentar crear la cuenta
    try {
      const url = `/api/usuarios/registro`; // Asegúrate que esta URL coincida con tu backend
      await clienteAxios.post(url, { Id_Usuario, Nom_Usuario, Cor_Usuario, password });
      
      setAlerta({
        msg: "Cuenta creada correctamente. Revisa tu correo para confirmar tu cuenta.",
        error: false
      });

      clearForm(); // Limpiar el formulario tras el éxito
    } catch (error) {
      setAlerta({
        msg: error.response.data.message || "Hubo un error en el registro.",
        error: true
      });
    }
  };

  // Limpiar el formulario
  const clearForm = () => {
    setId_Usuario("");
    setNom_Usuario("");
    setCor_Usuario("");
    setPassword("");
    setPasswordRepeat("");
  };

  const { msg } = alerta;

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            Crea una Cuenta y Gestiona {""}
            <span className="text-green-700">tus Documentos</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Documento:{" "}
              </label>
              <input
                type="text"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Tu Documento"
                value={Id_Usuario}
                onChange={(e) => setId_Usuario(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Nombre:{" "}
              </label>
              <input
                type="text"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Tu Nombre"
                value={Nom_Usuario}
                onChange={(e) => setNom_Usuario(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Correo:{" "}
              </label>
              <input
                type="email"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Tu Correo"
                value={Cor_Usuario}
                onChange={(e) => setCor_Usuario(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Contraseña:{" "}
              </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Tu Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="uppercase text-stone-600 font-bold block text-base">
                Repetir Contraseña:{" "}
              </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                placeholder="Repite tu Contraseña"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-green-800 w-full py-3 px-8 rounded-xl text-white mt-2 uppercase font-bold hover:cursor-pointer hover:bg-green-900 md:w-auto"
            />
          </form>
          <nav className="mt-6 lg:flex lg:justify-between">
            <Link to="/login-admin" className="block text-center my-5 text-gray-500">
              ¿Tienes una Cuenta? Inicia Sesión
            </Link>
            <Link to="/olvide-password" className="block text-center my-5 text-gray-500">
              Olvidé mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
