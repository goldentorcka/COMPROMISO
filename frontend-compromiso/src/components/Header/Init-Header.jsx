
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Aquí podrías incluir estilos personalizados

function Header_Init() {
  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link to="/">
          <img src="../../Public/images/logos/logo.png" alt="Logo de CALGDOCS" style={{ height: '60px' }} />
        </Link>
        <h1>CALGDOCS</h1>
      </div>
    </header>
  );
}

export default Header_Init;
