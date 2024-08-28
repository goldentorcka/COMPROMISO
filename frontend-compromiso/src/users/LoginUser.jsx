import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clientAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginFormAdmin = () => {
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([Cor_Usuario, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      return;
    }

    if (!Cor_Usuario.includes("@")) {
      setAlerta({
        msg: "El correo debe contener un '@'.",
        error: true,
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlerta({
        msg: "La contraseña es débil. Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.",
        error: true,
      });
      return;
    }

    try {
      const url = "/api/usuarios/login"; // Ruta de la API para iniciar sesión
      const { data } = await clientAxios.post(url, {
        Cor_Usuario,
        password,
      });

      ReactSession.set("token", data.token);
      setAuth(data);

      if (data.rol === "Administrador") {
        navigate("/admin"); // Redirige a la página de admin si el rol es "Administrador"
      } else {
        setAlerta({
          msg: "No tienes permisos para acceder al panel de administración.",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.error || "Hubo un error, intenta nuevamente",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="container mt-5 login-container">
      <h1 className="text-center mb-4 login-title">
        Inicia Sesión
        <span className="d-block">en el Aplicativo COMPROMISO SENA</span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit} className="card p-4 shadow login-card">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                value={Cor_Usuario}
                onChange={(e) => setCor_Usuario(e.target.value)}
                className="form-control login-input"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Aquí su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control login-input"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn login-button mt-3">
                Iniciar Sesión
              </button>
              <Link to="/" className="btn login-back-button mt-3">
                &#8592; Volver
              </Link>
            </div>
          </form>
          <nav className="text-center mt-4">
            <Link to="/auth/registrar" className="d-block login-link">
              ¿No tienes una Cuenta? Regístrate
            </Link>
            <Link to="/auth/olvide-password" className="d-block login-link">
              Olvidé mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LoginFormAdmin;
