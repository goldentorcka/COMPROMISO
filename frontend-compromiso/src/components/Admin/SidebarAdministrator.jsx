import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUserShield, faProjectDiagram, faBuilding, faLayerGroup, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const sidebarStyle = {
  backgroundColor: '#282c34',
  color: '#ffffff',
  height: '100vh',
};

const navLinkStyle = {
  color: '#ffffff',
  transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 15px',
  textDecoration: 'none',
};

const navLinkHoverStyle = {
  backgroundColor: '#61dafb',
  color: '#282c34',
  transform: 'translateX(10px)',
};

const iconStyle = {
  color: '#ffffff',
  transition: 'color 0.3s, transform 0.3s',
};

const iconHoverStyle = {
  color: '#282c34',
  transform: 'scale(1.2)',
};

const offcanvasHeaderStyle = {
  backgroundColor: '#61dafb',
  color: '#282c34',
};

const sidebarHeaderStyle = {
  borderBottom: '1px solid #444',
};

const hrStyle = {
  borderColor: '#ffffff',
};

const SidebarAdministrator = () => {
  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0" style={sidebarStyle}>
        <div className="offcanvas-md offcanvas-end" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header" style={offcanvasHeaderStyle}>
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2 active" to="/" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faTachometerAlt} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/CrudUsers" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faUsers} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD USUARIOS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Responsables" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faUserShield} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD RESPONSABLES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Areas" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faBuilding} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD AREAS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Unidades" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faLayerGroup} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD UNIDADES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Procesos" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faProjectDiagram} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD PROCESOS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Procedimientos" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faFileAlt} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD PROCEDIMIENTO
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/Formatos" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faCogs} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  CRUD FORMATOS
                </Link>
              </li>
            </ul>

            <hr className="my-3" style={hrStyle} />

            <ul className="nav flex-column mb-auto">
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="#" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faCogs} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-2" to="/login-admin" style={navLinkStyle} onMouseEnter={(e) => e.currentTarget.style = {...navLinkStyle, ...navLinkHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = navLinkStyle}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} onMouseEnter={(e) => e.currentTarget.style = {...iconStyle, ...iconHoverStyle}} onMouseLeave={(e) => e.currentTarget.style = iconStyle} />
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdministrator;
