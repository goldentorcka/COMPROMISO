// src/pages/LoginFormAdmin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userIcon from "../Public/images/IconLogin/Correo.svg";
import lockIcon from "../Public/images/IconLogin/Password.svg";
import logo from "../Public/images/logos/logo.png";
import CustomAlert from "../components/Alert/AlertaLogin.jsx"; // Asegúrate de que el nombre del archivo coincida
import NavMenuPublic from "../components/Nav/NavMenuPublic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  position: relative; /* Asegúrate de que el contenedor tenga posición relativa */
`;

const FormCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Button = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #145dbf;
  }
`;

const LinkStyled = styled(Link)`
  color: #1877f2;
  transition: color 0.3s;
  &:hover {
    color: #145dbf;
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
  animation: rotate 10s linear infinite;
`;

const LoginFormAdmin = () => {
  const [alerta, setAlerta] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostrar mensaje de bienvenida al iniciar sesión
    setAlerta({ message: "¡Bienvenido! Has iniciado sesión en el aplicativo." });
  
    // Redirigir al administrador después de 3 segundos
    setTimeout(() => {
      setAlerta({});
      navigate("/administrator"); // Redirige al home admin
    }, 3000); // Tiempo de espera de 3 segundos antes de redirigir
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <NavMenuPublic />
      <FormContainer>
        {alerta.message && <CustomAlert message={alerta.message} />}
        <div className="text-center mb-4">
          <Logo src={logo} alt="Logo" />
          <h1>Inicia Sesión</h1>
          <p>INGRESA AL APLICATIVO COMPROMISO SENA</p>
        </div>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 position-relative">
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                className="form-control ps-5"
                style={{ borderRadius: "5px", height: "46px", paddingLeft: "40px" }}
              />
              <img
                src={userIcon}
                alt="Usuario"
                style={{ width: "20px", height: "20px", position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
            <div className="form-group mb-3 position-relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Aquí su Contraseña"
                className="form-control ps-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "5px", height: "46px", paddingLeft: "40px" }}
              />
              <img
                src={lockIcon}
                alt="Contraseña"
                style={{ width: "20px", height: "20px", position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit">INGRESAR</Button>
            </div>
            <div className="text-center mt-3">
              <LinkStyled to="/olvide-password">Olvidé mi Contraseña</LinkStyled>
            </div>
          </form>
        </FormCard>
      </FormContainer>
    </>
  );
};

export default LoginFormAdmin;
