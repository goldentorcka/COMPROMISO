import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Estilos
const containerStyles = {
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
};

const inputStyles = {
  borderRadius: "5px",
  padding: "0.5rem",
};

const buttonStyles = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  borderRadius: "5px",
  padding: "0.75rem 1.5rem",
  transition: "background-color 0.3s",
  width: "100%",
};

const buttonHoverStyles = {
  backgroundColor: "#0056b3",
};

const OlvidePassword = () => {
  const [Cor_Usuario, setCor_Usuario] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Cor_Usuario === "" || Cor_Usuario.length < 7) {
      setAlerta({
        msg: "El Correo es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const url = `/api/user/olvide-password`;
      const { data } = await clienteAxios.post(url, {
        Cor_Usuario,
      });
      setAlerta({
        msg: data.msg,
      });
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
      <div className="container mt-5">
        <h1 className="text-center mb-4" style={{ color: "#007bff" }}>
          Recupera tu Contraseña
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {msg && <Alerta alerta={alerta} />}
            <form
              onSubmit={handleSubmit}
              style={containerStyles}
              className="shadow p-4"
            >
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
                  className="form-control"
                  style={inputStyles}
                />
              </div>
              <button
                type="submit"
                className="btn mt-3"
                style={buttonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                }}
              >
                Recuperar Contraseña
              </button>
            </form>
            <nav className="text-center mt-4">
              <Link
                to="/login-admin"
                className="d-block mb-3"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                ¿Tienes una Cuenta? Inicia Sesión
              </Link>
              <Link
                to="/registrar"
                className="d-block"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                ¿No tienes una Cuenta? Regístrate
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default OlvidePassword;
