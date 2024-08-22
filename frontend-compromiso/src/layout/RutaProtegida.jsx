import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authProvider'; // Contexto de autenticación
import NavMenuPrivate from '../components/NavMenuPrivate'; // Componente del menú privado

const RutaProtegida = () => {
  const { isAuthenticated } = useContext(AuthContext); // Obtiene el estado de autenticación del contexto

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login-admin" />; // Redirección al login si no está autenticado
  }

  // Si está autenticado, renderiza el menú privado y las rutas hijas
  return (
    <>
      <NavMenuPrivate /> {/* Componente del menú de navegación privado */}
      <div className="container">
        <Outlet /> {/* Renderiza las rutas hijas (por ejemplo, CRUD de usuarios) */}
      </div>
    </>
  );
};

export default RutaProtegida;
