import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarAdministrator from '../SidebarAdministrator';
import Home_Admin from '../usersAdmin/home_Admin'; // Asegúrate de que la ruta sea correcta
import appIcon from '../../../../Public/images/logo.png'; // Asegúrate de tener el ícono aquí

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <SidebarAdministrator />

      <div className="main-content">
        {/* Mostrar el Home_Admin en la ruta base "/administrator" */}
        {location.pathname === '/administrator' ? (
          <Home_Admin />
        ) : (
          <Outlet /> 
        )}
      </div>
    </div>
  );
};

export default Layout;
