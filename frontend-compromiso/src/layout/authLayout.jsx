import React from 'react';
import { Outlet } from 'react-router-dom';
import NavMenuPublic from '../components/Nav/NavMenuPublic.jsx';

const AuthLayout = () => {
  return (
    <>
      <NavMenuPublic />
      <div className="container">
        <Outlet /> {/* Renderiza las rutas hijas (login, registro, etc.) */}
      </div>
    </>
  );
};

export default AuthLayout;
