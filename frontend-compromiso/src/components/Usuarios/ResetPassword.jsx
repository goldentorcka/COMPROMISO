import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    if (!token) {
      setMessage("Token no válido o expirado.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password/${userId}`,
        { password, token }
      );

      setMessage(response.data.message);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setMessage("Error al restablecer la contraseña. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Restablecer Contraseña</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nueva Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Restableciendo..." : "Restablecer Contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
