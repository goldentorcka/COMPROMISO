import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clientAxios from "../config/axios.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { ReactSession } from "react-client-session";
import "bootstrap/dist/css/bootstrap.min.css";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/iconLogin/Password.svg";

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
      const url = "/api/usuarios/login"; // Asegúrate de que la ruta esté correctamente configurada en tu servidor
      const { data } = await clientAxios.post(url, {
        Cor_Usuario,
        password,
      });

      ReactSession.set("token", data.token);
      setAuth(data);

      if (data.rol === "Administrador") {
        navigate("/Administrator");
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
    <div
      className="container mt-5"
      style={{ animation: "fadeIn 1.2s ease-in-out" }}
    >
      <h1
        className="text-center mb-4"
        style={{
          fontSize: "2rem",
          color: "#007bff",
          fontWeight: "bold",
          animation: "slideInDown 1s ease-out",
        }}
      >
        Inicia Sesión
        <span className="d-block">en el Aplicativo COMPROMISO SENA</span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
            className="card p-4 shadow"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
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
                style={{
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  borderRadius: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                }}
              >
                Iniciar Sesión
              </button>
              <Link
                to="/Administrator"
                className="btn mt-3"
                style={{
                  backgroundColor: "#6c757d",
                  color: "#ffffff",
                  borderRadius: "5px",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#5a6268";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6c757d";
                }}
              >
                &#8592; Volver
              </Link>
            </div>
          </form>
          <nav className="text-center mt-4">
            <Link
              to="/registrar"
              className="d-block"
              style={{
                color: "#007bff",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0056b3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#007bff";
              }}
            >
              ¿No tienes una Cuenta? Regístrate
            </Link>
            <Link
              to="/olvide-password"
              className="d-block"
              style={{
                color: "#007bff",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0056b3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#007bff";
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
