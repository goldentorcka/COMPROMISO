// src/components/Admin/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdministrator from '../SidebarAdministrator';
import '../../styles/layaout.css';
import appIcon from '../../../Public/images/logos/logo.png'; // Asegúrate de tener el ícono aquí

const Layout = () => {
  return (
    <div className="layout-container">
      <header className="app-header">
        <img src={appIcon} alt="App Icon" className="app-icon" />
        <h1>Mi Aplicación</h1>
      </header>
      <SidebarAdministrator />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
