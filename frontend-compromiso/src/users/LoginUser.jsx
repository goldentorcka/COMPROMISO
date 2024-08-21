import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clieteAxios from "../config/axios";
import useAuth from "../hooks/useAuth.jsx";
import { ReactSession } from "react-client-session";
import "../css/stylesLoginUserAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";  // Importar estilos de Bootstrap


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
      const url = "/api/usuarios";
      const { data } = await clieteAxios.post(url, {
        Cor_User: Cor_User,
        password: password,
      });

      // Guardar el token en la sesión
      ReactSession.set("token", data.token);

      // Guardar la información del usuario en el estado global
      setAuth(data);

      // Verificar si el usuario es administrador
      if (data.isAdmin) {
        navigate("/admin");
      } else {
        setAlerta({
          msg: "No tienes permisos para acceder al panel de administración.",
          error: true,
        });
      }

    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg || "Error al iniciar sesión",
        error: true,
      });
    }
  };
  const { msg } = alerta;
  return (
    <div className="container mt-5">
      <h1 className="title">
        Inicia Sesión
        <span> en el Aplicativo COMPROMISO SENA</span>
      </h1>
      <div className="form-container">
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              placeholder="Aquí su Correo"
              value={Cor_User}
              onChange={(e) => setCor_User(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Aquí su Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            Iniciar Sesión
          </button>
        </form>
        <nav>
          <Link to="/auth/registrar" className="d-block mt-3 text-decoration-none text-primary">
            ¿No tienes una Cuenta? Regístrate
          </Link>
          <Link to="/olvide-password" className="d-block mt-2 text-decoration-none text-primary">
            Olvidé mi Contraseña
          </Link>
        </nav>
      </div>
      <Link to="/" className="btn btn-primary mt-4 back-button">
        &#8592; Volver
      </Link>
    </div>
  );
};

export default LoginFormAdmin;
