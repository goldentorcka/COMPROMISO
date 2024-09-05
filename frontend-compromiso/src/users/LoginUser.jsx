import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/iconLogin/Password.svg";
import clienteAxios from "../config/axios";  // Asegúrate de tener configurado clienteAxios
import { ReactSession } from "react-client-session"; 
import Alerta from "../components/Alert/Alerta.jsx";

// Estilos de color
const formStyles = {
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
};

const buttonStyles = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

const buttonHoverStyles = {
  backgroundColor: "#0056b3",
};

const linkStyles = {
  color: "#007bff",
  transition: "color 0.3s",
};

const linkHoverStyles = {
  color: "#0056b3",
};

const headerStyles = {
  fontSize: "2rem",
  color: "#007bff",
  fontWeight: "bold",
  animation: "slideInDown 1s ease-out, pulse 1.5s infinite",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
};

const spanStyles = {
  display: "block",
  fontSize: "1.2rem",
  color: "#343a40",
  marginTop: "0.5rem",
  animation: "fadeIn 2s ease-in-out",
};

const volverButtonStyles = {
  backgroundColor: "#6c757d",
  color: "#ffffff",
  borderRadius: "5px",
  transition: "background-color 0.3s, transform 0.3s",
};

const volverButtonHoverStyles = {
  backgroundColor: "#5a6268",
  transform: "scale(1.05)",
};

const LoginFormAdmin = () => {
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([Cor_Usuario, password].includes("")) {
      setAlerta({
        msg: "Todos los campos deben estar llenos",
        error: true,
      });
      return;
    }

    try {
      const url = `/api/user/login`;
      const { data } = await clienteAxios.post(url, {
        Cor_Usuario: Cor_Usuario,
        password: password,
      });

      // Almacena el token en la sesión
      ReactSession.set("token", data.token);

      // Redirige al panel de administración
      navigate("/Administrator");
    } catch (error) {
      ReactSession.remove("token");
      localStorage.clear();
      setAlerta({
        msg: error.response?.data?.msg || "Error al iniciar sesión",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div
      className="container mt-5"
      style={{ animation: "fadeIn 1.2s ease-in-out" }}
    >
      <h1 className="text-center mb-4" style={headerStyles}>
        Inicia Sesión
        <span style={spanStyles}>en el Aplicativo COMPROMISO SENA</span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form
            onSubmit={handleSubmit}
            className="card p-4 shadow"
            style={formStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {msg && <Alerta alerta={alerta} />}
            <div className="form-group mb-3 position-relative">
              <label htmlFor="email" className="form-label">
                Correo:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                value={Cor_Usuario}
                onChange={(e) => setCor_Usuario(e.target.value)}
                className="form-control ps-5"
                style={{ borderRadius: "5px", paddingLeft: "40px" }}
              />
              <img
                src={userIcon}
                alt="Usuario"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
                style={{ width: "20px", height: "20px", left: "15px" }}
              />
            </div>
            <div className="form-group mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Aquí su Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control ps-5"
                style={{ borderRadius: "5px", paddingLeft: "40px" }}
              />
              <img
                src={lockIcon}
                alt="Contraseña"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
                style={{ width: "20px", height: "20px", left: "10px" }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className="btn mt-3"
                style={buttonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    buttonHoverStyles.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    buttonStyles.backgroundColor;
                }}
              >
                Iniciar Sesión
              </button>
              <Link
                to="/"
                className="btn mt-3"
                style={volverButtonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    volverButtonHoverStyles.backgroundColor;
                  e.currentTarget.style.transform =
                    volverButtonHoverStyles.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    volverButtonStyles.backgroundColor;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                &#8592; Volver
              </Link>
            </div>
          </form>
          <nav className="text-center mt-4">
            <Link
              to="/olvide-password"
              className="d-block"
              style={linkStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = linkHoverStyles.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkStyles.color;
              }}
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
