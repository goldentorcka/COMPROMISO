import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Login = ({setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      alert(response.data.message)
      navigate('/Home');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      alert('Error de inicio de sesión. Por favor, verifica tus credenciales.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <br />
      <br />
      <h2>Iniciar sesión</h2>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-5 top-12 transform"
              >
                <FaEye />
              </button>

        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>
      <div className="text-center my-5">
  <Link
    to="/forgot-password"
    className="btn btn-link text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Olvidé mi Contraseña
  </Link>

  {/* <Link
    to="/register"
    className="btn btn-link text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Registrarse
  </Link> */}
</div>
    </div>
  );
};

export default Login;