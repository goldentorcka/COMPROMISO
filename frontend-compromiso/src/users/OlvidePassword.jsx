import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
import "../components/styles/stylesOlvidePasssword.css";

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
      <div className="container container-olvide-password">
        <h1 className="text-title">Recupera tu Contraseña</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit} className="shadow p-4">
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
                  className="form-control input-field"
                />
              </div>
              <button
                type="submit"
                className="btn btn-olvide-password"
              >
                Recuperar Contraseña
              </button>
            </form>
            <nav className="text-center mt-4">
              <Link to="/login-admin" className="d-block mb-3 link-nav">
                ¿Tienes una Cuenta? Inicia Sesión
              </Link>
              <Link to="/registrar" className="d-block link-nav">
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
