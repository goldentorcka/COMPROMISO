import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clieteAxios from "../config/axios";
import useAuth from "../hooks/useAuth.jsx";
import { ReactSession } from "react-client-session";

const LoginFormAdmin = () => {
  const [Cor_User, setCor_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([Cor_User, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      return;
    }

    try {
      const url = "/api/user/login";
      const { data } = await clieteAxios.post(url, {
        Cor_User: Cor_User,
        password: password,
        isAdmin: true, // Asumir que el usuario es administrador
      });

      ReactSession.set("token", data.token);

      setAuth(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-stone-400 font-black text-5xl">
          Inicia Sesión{""}
          <span className="text-green-700">
            {" "}
            en el Aplicativo COMPROMISO SENA
          </span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-stone-600 font-bold block text-xl">
              Correo:{" "}
            </label>
            <input
              type="email"
              className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
              placeholder="Aquí su Correo"
              value={Cor_User}
              onChange={(e) => setCor_User(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-stone-600 font-bold block text-xl">
              Contraseña:
            </label>
            <input
              type="password"
              className="border w-full p-2 mt-2 bg-gray-100 rounded-xl"
              placeholder="Aquí su Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-green-800 w-full py-3 px-8 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-900 md:w-auto "
          />
        </form>
        <nav className="mt-8 lg:flex lg:justify-between">
          <Link
            to="/auth/registrar" // Ruta actualizada
            className="block text-center my-5 text-gray-500"
          >
            ¿No tienes una Cuenta? Regístrate
          </Link>
          <Link
            to="/olvide-password"
            className="block text-center my-5 text-gray-500"
          >
            Olvidé mi Contraseña
          </Link>
        </nav>
      </div>
    </>
  );
};

export default LoginFormAdmin;
