import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alert/Alerta.jsx";

const CambiarPassword = () => {
  const [password, setPassword] = useState(""); // Para la nueva contraseña
  const [alerta, setAlerta] = useState({}); // Para manejar mensajes de alerta
  const [tokenValido, setTokenValido] = useState(false); // Para validar el token
  const [passwordModificado, setPasswordModificado] = useState(false); // Estado si la contraseña fue modificada
  const { token } = useParams(); // Token desde la URL

  // Efecto para comprobar la validez del token al cargar el componente
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/api/user/validar-token/${token}`;
        const { data } = await clienteAxios.get(url);
        setTokenValido(true);
        setAlerta({
          msg: "Coloca tu nueva contraseña",
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: "El enlace no es válido o ha caducado",
          error: true,
        });
      }
    };
    comprobarToken();
  }, [token]);

  // Manejador para el submit del formulario de cambio de contraseña
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de la contraseña
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, debe tener al menos 6 caracteres.",
        error: true,
      });
      return;
    }

    try {
      const url = `/api/user/cambiar-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg, // Mensaje desde el servidor
        error: false,
      });
      setPasswordModificado(true); // Indicador de que la contraseña fue modificada correctamente
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, // Mensaje de error desde el servidor
        error: true,
      });
    }
  };

  const { msg } = alerta; // Extraer el mensaje de la alerta

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            Cambia tu Contraseña y Mantén Seguro el Acceso a{" "}
            <span className="text-green-700">tus Datos</span>
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {/* Mostrar la alerta si hay algún mensaje */}
          {msg && <Alerta alerta={alerta} />}

          {/* Formulario solo se muestra si el token es válido */}
          {tokenValido && (
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-stone-600 font-bold block text-xl">
                  Nueva Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
                  placeholder="Ingresa tu nueva contraseña"
                />
              </div>
              <input
                type="submit"
                value="Guardar Nueva Contraseña"
                className="bg-green-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-900 md:w-auto"
              />
            </form>
          )}

          {/* Mostrar el enlace para iniciar sesión si la contraseña fue modificada */}
          {passwordModificado && (
            <nav className="mt-8">
              <Link to="/login" className="block text-center my-5 text-gray-500">
                Iniciar Sesión
              </Link>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
