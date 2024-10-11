import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/register`, {
        username,
        email,
        password,
      });
      alert('Registro exitoso. Por favor, Ya Puedes iniciar sesion con otra cuenta');
      resetForm()
    } catch (error) {
      console.error('Error de registro:', error);
      alert('Error en el registro. Por favor, intenta de nuevo.');
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>


    </div>
  );
};

export default Register;