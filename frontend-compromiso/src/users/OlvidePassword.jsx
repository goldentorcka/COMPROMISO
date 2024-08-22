import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";
import "../css/stylesLoginUserAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";  // Importar estilos de Bootstrap

const OlvidePassword = () => {
  const [Cor_User, setCor_User] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Cor_User === "") {
      setAlerta({
        msg: "El correo es obligatorio!",
        error: true,
      });
      return;
    }

    try {
      const url = "/api/usuarios/olvide-password";
      const { data } = await clientAxios.post(url, { Cor_User });

      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg || "Error al enviar el correo de recuperación",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="container mt-5">
      <h1 className="title">
        Recupera tu Contraseña
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
          <button type="submit" className="btn btn-success w-100 mt-3">
            Enviar Instrucciones
          </button>
        </form>
        <nav>
          <Link to="/auth/registrar" className="d-block mt-3 text-decoration-none text-primary">
            ¿No tienes una Cuenta? Regístrate
          </Link>
          <Link to="/" className="d-block mt-2 text-decoration-none text-primary">
            Iniciar Sesión
          </Link>
        </nav>
      </div>
      <Link to="/" className="btn btn-primary mt-4 back-button">
        &#8592; Volver
      </Link>
    </div>
  );
};

export default OlvidePassword;
