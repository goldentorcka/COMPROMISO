import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUserShield, faProjectDiagram, faBuilding, faLayerGroup, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/stylesSidebar.css';

const SidebarAdministrator = () => {
  const [isUserActive, setIsUserActive] = React.useState(true);

  return (
    <div className="sidebar">
      <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <ul className="nav flex-column">
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
              to="/administrator/Formatos"
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
                to="/login-admin"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                Sign out
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="user-section d-flex align-items-center justify-content-between p-3 mt-auto">
          <div className="user-info d-flex align-items-center">
            <FontAwesomeIcon icon={faUserShield} className="icon user-icon" />
            <span className="user-name ms-2">Usuario Nombre</span>
          </div>
          <div className={`status-indicator ${isUserActive ? 'active' : 'inactive'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdministrator;
