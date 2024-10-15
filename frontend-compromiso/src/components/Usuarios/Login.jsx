import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import '../styles/login.css'; // Importa el archivo CSS
import { motion } from 'framer-motion'; // Para animaciones 3D
import axios from 'axios';


const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Nueva alerta para errores
  const [userName, setUserName] = useState('');
  const [dialogText, setDialogText] = useState('');
  const [alertImage, setAlertImage] = useState("/images/alert-user.png"); // Controla qué imagen mostrar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUserName(user.name);
        setAlertImage("/images/alert-user.png"); // Muestra la imagen del usuario
        setShowAlert(true);
        setDialogText("¡Bienvenido haz iniciado sesion en el aplicactivo CALGDOCS!");

        speakText("¡Bienvenido haz iniciado sesion en el aplicactivo CALGDOCS!");

        setTimeout(() => {
          setShowAlert(false);
          navigate('/administrator');
        }, 4000); 
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setAlertImage("/images/invalid-user.png"); // Muestra la imagen de error
      setDialogText("¡Credenciales inválidas!");
      setShowErrorAlert(true); // Muestra la alerta de error

      speakText("Credenciales inválidas");

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 4000); // Oculta la alerta después de 4 segundos
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavMenuPublic />
      <div className="form-container">
        <div className="text-center mb-4">
          <img className="logo" src="/images/logo.png" alt="Logo" />
          <h1>Iniciar Sesión</h1>
          <p>INGRESA AL APLICATIVO CALGDOCS SENA</p>
        </div>
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 position-relative">
              <input
                id="email"
                type="email"
                placeholder="Aquí su Correo"
                className="form-control ps-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <img
                src="/images/Correo.svg"
                alt="Usuario"
                className="input-icon"
              />
            </div>
            <div className="form-group mb-3 position-relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Aquí su Contraseña"
                className="form-control ps-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <img
                src="/images/Password.svg"
                alt="Contraseña"
                className="input-icon"
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className="submit-button">Iniciar sesión</button>
            </div>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="link-styled">Olvidé mi Contraseña</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Alerta de éxito */}
      {showAlert && (
        <>
          <div className="overlay"></div>
          <motion.div
            className="alert-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.img
              className="alert-user-img"
              src="/images/alert-user.png"
              alt="Alerta"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <div className="dialog-box">
              <p>{dialogText}</p>
            </div>
          </motion.div>
        </>
      )}

      {/* Alerta de error */}
      {showErrorAlert && (
        <>
          <div className="overlay"></div>
          <motion.div
            className="alert-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.img
              className="alert-user-img"
              src="/images/alert-user.png"
              alt="Error de credenciales"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            <div className="dialog-box">
              <p>{dialogText}</p>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Login;
