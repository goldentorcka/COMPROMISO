import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import userIcon from "../../../Public/images/IconLogin/Correo.svg";
import lockIcon from "../../../Public/images/IconLogin/Password.svg";
import logo from "../../../Public/images/logos/logo.png"; 
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import styled from "styled-components";

// Estilos del contenedor y tarjeta de formulario
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  position: relative;
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

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      alert(response.data.message);
      navigate('/administrator');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      alert('Error de inicio de sesión. Por favor, verifica tus credenciales.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavMenuPublic />
      <FormContainer>
        <div className="text-center mb-4">
          <Logo src={logo} alt="Logo" />
          <h1>Iniciar Sesión</h1>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Aquí su Contraseña"
                className="form-control ps-5"
                style={{ borderRadius: "5px", height: "46px", paddingLeft: "40px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Button type="submit">Iniciar sesión</Button>
            </div>
            <div className="text-center mt-3">
              <LinkStyled to="/forgot-password">Olvidé mi Contraseña</LinkStyled>
            </div>
          </form>
        </FormCard>
      </FormContainer>
    </>
  );
};

export default Login;
