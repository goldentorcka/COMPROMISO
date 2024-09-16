import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/iconLogin/Password.svg";
import eyeIcon from "../Public/images/IconLogin/Eye.svg"; // Añade el ícono de ojo
import eyeSlashIcon from "../Public/images/IconLogin/EyeSlash.svg"; // Añade el ícono de ojo tachado
import { ReactSession } from "react-client-session";
import '../components/styles/stylesLoginUser.css'; // Importa el archivo CSS

const LoginFormAdmin = () => {
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    ReactSession.set("token", "fake-token");
    navigate("/admin");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 header">
        Inicia Sesión
        <span className="header-span">en el Aplicativo COMPROMISO SENA</span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form
            onSubmit={handleSubmit}
            className="card p-4 shadow form-container"
          >
            <div className="form-group mb-3 icon-container">
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                value={Cor_Usuario}
                onChange={(e) => setCor_Usuario(e.target.value)}
                className="form-control"
              />
              <img
                src={userIcon}
                alt="Usuario"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
                style={{ width: "20px", height: "20px", left: "15px" }}
              />
            </div>
            <div className="form-group mb-3 icon-container">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Aquí su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
              <img
                src={lockIcon}
                alt="Contraseña"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
                style={{ width: "20px", height: "20px", left: "10px" }}
              />
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt="Mostrar/Ocultar Contraseña"
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className="btn mt-3 button"
              >
                Iniciar Sesión
              </button>
              <Link
                to="/"
                className="btn mt-3 volver-button"
              >
                &#8592; Volver
              </Link>
            </div>
          </form>
          <nav className="text-center mt-4">
            <Link
              to="/olvide-password"
              className="d-block link"
            >
              Olvidé mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LoginFormAdmin;
