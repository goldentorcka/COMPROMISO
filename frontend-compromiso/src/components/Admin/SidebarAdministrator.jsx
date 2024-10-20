import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUserShield, faProjectDiagram, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/stylesSidebar.css';
// import logo from './../../../Public/images/logo.png'; // Importación del logo

const SidebarAdministrator = () => {
  const [isUserActive, setIsUserActive] = React.useState(true);

  return (
    <div className="sidebar">
      <div className="sidebar-content d-md-flex flex-column p-0 pt-lg-3">
        
        {/* Logo del aplicativo
        <div className="logo-container">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </div> */}
        
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              CALGDOCS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator/Usuarios"
            >
              <FontAwesomeIcon icon={faUsers} className="icon" />
              USUARIOS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator/Responsables"
            >
              <FontAwesomeIcon icon={faUserShield} className="icon" />
              RESPONSABLES
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator/Procesos"
            >
              <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
              PROCESOS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator/Procedimientos"
            >
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              PROCEDIMIENTOS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
              to="/administrator/Documentos"
            >
              <FontAwesomeIcon icon={faCogs} className="icon" />
              FORMATOS
            </NavLink>
          </li>
        </ul>

        <hr className="my-3" />

        <div className="settings-logout">
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
                to="/login"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                Cerrar Sesion
              </NavLink>
            </li>
          </ul>
        </div>
{/* 
        <div className="user-section d-flex align-items-center justify-content-between p-3 mt-auto">
          <div className="user-info d-flex align-items-center">
            <FontAwesomeIcon icon={faUserShield} className="icon user-icon" />
            <span className="user-name ms-2">Usuario Nombre</span>
          </div>
          <div className={`status-indicator ${isUserActive ? 'active' : 'inactive'}`}></div>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarAdministrator;
