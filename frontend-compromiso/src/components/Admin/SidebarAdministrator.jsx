import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUserShield, faProjectDiagram, faBuilding, faLayerGroup, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css'; // Asegúrate de que la ruta sea correcta

const SidebarAdministrator = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    // Actualiza el enlace activo basado en la ruta actual
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/' ? 'active' : ''}`}
              to="/"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/CrudUsers' ? 'active' : ''}`}
              to="/CrudUsers"
            >
              <FontAwesomeIcon icon={faUsers} className="icon" />
              USUARIOS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Responsables' ? 'active' : ''}`}
              to="/Responsables"
            >
              <FontAwesomeIcon icon={faUserShield} className="icon" />
              RESPONSABLES
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Areas' ? 'active' : ''}`}
              to="/Areas"
            >
              <FontAwesomeIcon icon={faBuilding} className="icon" />
              AREAS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Unidades' ? 'active' : ''}`}
              to="/Unidades"
            >
              <FontAwesomeIcon icon={faLayerGroup} className="icon" />
              UNIDADES
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Procesos' ? 'active' : ''}`}
              to="/Procesos"
            >
              <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
              PROCESOS
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Procedimientos' ? 'active' : ''}`}
              to="/Procedimientos"
            >
              <FontAwesomeIcon icon={faFileAlt} className="icon" />
              PROCEDIMIENTO
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/Formatos' ? 'active' : ''}`}
              to="/Formatos"
            >
              <FontAwesomeIcon icon={faCogs} className="icon" />
              FORMATOS
            </Link>
          </li>
        </ul>

        <hr className="my-3" />

        <div className="settings-logout">
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/settings' ? 'active' : ''}`}
                to="/settings"
              >
                <FontAwesomeIcon icon={faCogs} className="icon" />
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${activeLink === '/login-admin' ? 'active' : ''}`}
                to="/login-admin"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdministrator;
