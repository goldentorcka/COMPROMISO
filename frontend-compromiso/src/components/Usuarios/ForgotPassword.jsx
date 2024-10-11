import { useState } from 'react';
import {Link  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/forgot-password`, { email });
      alert('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
      setLoading(false);
      if (response.data.token) {
        sessionStorage.setItem('resetToken', response.data.token);
        navigate(`/login`);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setMessage('Error al procesar la solicitud. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Olvidé mi contraseña</h2>
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
  <Link
    to="/login"
    className="btn btn-link text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Inicia Sesion
  </Link>


</div>
    </div>
  );
};

export default ForgotPassword;
