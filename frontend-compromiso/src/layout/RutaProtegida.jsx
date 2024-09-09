import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authProvider.jsx'; // Contexto de autenticación
import NavMenuAdministrator from '../components/Nav/NavMenuPrivate.jsx'; // Componente del menú privado
//import Footer from '../components/Footer'; // Componente de pie de página
// import VerticalNav from '../components/VerticalNav'; // Componente de navegación vertical (si existe)

const RutaProtegida = () => {
  const { auth, cargando } = useContext(AuthContext); // Obtiene el estado de autenticación y carga del contexto

  // Si la autenticación está en proceso, muestra un indicador de carga o nada
  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="uppercase text-center font-bold text-xl">
          No se ha podido cargar la página.
        </h1>
        <h2 className="uppercase text-center font-bold text-lg">
          Intenta volviendo a recargar
        </h2>
      </div>
    );
  }

  // Verifica si el usuario está autenticado
  const isAuthenticated = auth?.usuario?.Id_User || auth?.Id_User;

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login-admin" />;
  }

  // Si está autenticado, renderiza el menú privado y las rutas hijas
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-green-500 text-white fixed h-full overflow-y-auto z-10">
        <NavMenuAdministrator /> {/* O el componente adecuado para la navegación */}
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow ml-72 overflow-hidden">
        <div className="flex-grow overflow-auto p-10">
          <main>
          { /*    <Outlet /> {/* Renderiza las rutas hijas (por ejemplo, CRUD de usuarios) */}  /* 
          </main>
        </div>
        { /* <Footer /> {/* Componente de pie de página */}
      </div>
    </div>
  );
};

export default RutaProtegida;
