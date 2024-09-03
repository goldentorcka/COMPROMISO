import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clientAxios from "../config/axios.jsx";
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
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h1 className="text-center mb-4" style={{ color: "#333", fontSize: "2rem", fontWeight: "bold" }}>
        Recupera tu Contraseña
        <span className="d-block" style={{ fontSize: "1.2rem", fontWeight: "normal" }}>
          en el Aplicativo COMPROMISO SENA
        </span>
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit} className="card p-4 shadow" style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label" style={{ fontWeight: "bold", color: "#555" }}>
                Correo:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                value={Cor_User}
                onChange={(e) => setCor_User(e.target.value)}
                className="form-control"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#e9ecef" }}
              />
            </div>
            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{ padding: "10px", fontSize: "1rem", borderRadius: "5px", backgroundColor: "#85c1e9", color: "#fff", border: "none", transition: "background-color 0.3s ease, transform 0.3s ease" }}
            >
              Enviar Instrucciones
            </button>
          </form>
          <nav className="text-center mt-4">
            <Link to="/auth/registrar" className="d-block text-decoration-none text-primary" style={{ display: "block", marginBottom: "10px", color: "#007bff", fontWeight: "bold" }}>
              ¿No tienes una Cuenta? Regístrate
            </Link>
            <Link to="/login-admin" className="d-block text-decoration-none text-primary" style={{ color: "#007bff", fontWeight: "bold" }}>
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </div>
      <Link
        to="/"
        className="btn btn-primary mt-4"
        style={{ padding: "10px 20px", fontSize: "1rem", borderRadius: "5px", textAlign: "center", backgroundColor: "#85c1e9", color: "#fff", border: "none", transition: "background-color 0.3s ease, transform 0.3s ease" }}
      >
        &#8592; Volver
      </Link>
    </div>
  );
};

export default OlvidePassword;
