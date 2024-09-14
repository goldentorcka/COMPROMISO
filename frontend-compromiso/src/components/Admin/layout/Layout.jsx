// src/components/Admin/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Asegúrate de importar Outlet
import SidebarAdministrator from '../SidebarAdministrator'; // Asegúrate de que la ruta sea correcta
import '../../styles/layaout.css'; // Asegúrate de que los estilos sean correctos

const Layout = () => {
  return (
    <div className="layout-container">
      <SidebarAdministrator />
      <main className="main-content">
        <Outlet /> {/* Esto renderiza las rutas anidadas */}
      </main>
    </div>
  );
};

export default Layout;
