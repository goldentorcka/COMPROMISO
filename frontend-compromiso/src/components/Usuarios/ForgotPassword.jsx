import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Limpiar mensaje previo

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email });

      // Mostrar mensaje de éxito
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
      }

      // Limpiar campo de correo
      setEmail('');

      // Redirigir a la página de login después de enviar el correo
      setTimeout(() => {
        navigate(`/login`); // Redirigir a login después de enviar el correo
      }, 3000); // Esperar 3 segundos antes de redirigir

    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      // Manejo de errores
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error al procesar la solicitud. Por favor, intenta de nuevo.');
      } else {
        setMessage('Error al procesar la solicitud. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false); // Asegurarse de que el estado de carga se apague en ambos casos
    }
  };

  return (
    <>
      <NavMenuPublic />
      <div className="container mt-5">
        <h2 className="text-center">Olvidé mi contraseña</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
        <div className="text-center my-5">
          <Link to="/login" className="btn btn-link">Iniciar Sesión</Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
