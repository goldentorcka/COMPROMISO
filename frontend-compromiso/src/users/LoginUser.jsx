import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/iconLogin/Password.svg";
import logo from "../Public/images/logos/logo.png"; // Asegúrate de que la ruta del logo sea correcta
import Alerta from "../components/Alert/Alerta.jsx";

// Estilos de color
const formStyles = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
};

const buttonStyles = {
  backgroundColor: "#1877f2",
  color: "#ffffff",
  borderRadius: "5px",
  padding: "10px 20px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyles = {
  backgroundColor: "#145dbf",
};

const linkStyles = {
  color: "#1877f2",
  transition: "color 0.3s",
};

const linkHoverStyles = {
  color: "#145dbf",
};

const headerStyles = {
  fontSize: "1.5rem",
  color: "#1877f2",
  fontWeight: "bold",
  marginBottom: "1rem",
  textAlign: "center",
};

const spanStyles = {
  display: "block",
  fontSize: "1rem",
  color: "#606770",
  marginTop: "0.5rem",
};

const volverButtonStyles = {
  backgroundColor: "#f0f2f5",
  color: "#606770",
  borderRadius: "5px",
  padding: "10px 20px",
  border: "none",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.3s",
};

const volverButtonHoverStyles = {
  backgroundColor: "#e4e6eb",
  transform: "scale(1.05)",
};

const LoginFormAdmin = () => {
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Muestra una alerta de saludo
    alert("¡Hola! Has iniciado sesión.");

    // Redirige al panel de administración
    navigate("/Administrator");
  };

  const { msg } = alerta;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 style={headerStyles}>Inicia Sesión</h1>
        <span style={spanStyles}>EN EL APLICATIVO COMPROMISO SENA</span>
        <img src={logo} alt="Logo" style={{ width: "150px", marginTop: "1rem" }} />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
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
                className="form-control ps-5"
                style={{ borderRadius: "5px", paddingLeft: "40px" }}
              />
              <img
                src={userIcon}
                alt="Usuario"
                className="position-absolute top-50 start-0 translate-middle-y"
                style={{ width: "20px", height: "20px", left: "12px", top: "50%", transform: "translateY(-50%)" }}
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
                className="form-control ps-5"
                style={{ borderRadius: "5px", paddingLeft: "40px" }}
              />
              <img
                src={lockIcon}
                alt="Contraseña"
                className="position-absolute top-50 start-0 translate-middle-y"
                style={{ width: "20px", height: "20px", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="submit"
                className="btn"
                style={buttonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                }}
              >
                Iniciar Sesión
              </button>
              <Link
                to="/"
                className="btn"
                style={volverButtonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = volverButtonHoverStyles.backgroundColor;
                  e.currentTarget.style.transform = volverButtonHoverStyles.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = volverButtonStyles.backgroundColor;
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