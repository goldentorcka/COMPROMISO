import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
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
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email });
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
    <>
      <NavMenuPublic />
      <div className="container mt-5">
        <h2 className="text-center animated-title">Olvidé mi contraseña</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="form-animate">
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

      <style jsx>{`
        .container {
          perspective: 1000px;
        }

        .form-animate {
          transform: rotateY(0deg);
          animation: float 3s ease-in-out infinite alternate;
          transition: transform 0.3s ease;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        .animated-title {
          animation: fadeIn 2s ease-in-out;
          color: #4a90e2;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ForgotPassword;
