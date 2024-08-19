import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const RutaProtegida = () => {
  const { auth } = useAuth();

  if (!auth?.token) {
    // Redirige a la página de inicio de sesión si no está autenticado
    return <Navigate to="/login-admin" />;
  }

  return <Outlet />;
};

export default RutaProtegida;
