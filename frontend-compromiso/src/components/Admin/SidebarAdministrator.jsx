import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faUserShield, faProjectDiagram, faBuilding, faLayerGroup, faFileAlt, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SidebarAdministrator = () => {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 active" to="/">
                <FontAwesomeIcon icon={faTachometerAlt} />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/CrudUsers">
                <FontAwesomeIcon icon={faUsers} />
                CRUD USUARIOS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Responsables">
                <FontAwesomeIcon icon={faUserShield} />
                CRUD RESPONSABLES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Areas">
                <FontAwesomeIcon icon={faBuilding} />
                CRUD AREAS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Unidades">
                <FontAwesomeIcon icon={faLayerGroup} />
                CRUD UNIDADES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Procesos">
                <FontAwesomeIcon icon={faProjectDiagram} />
                CRUD PROCESOS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Procedimientos">
                <FontAwesomeIcon icon={faFileAlt} />
                CRUD PROCEDIMIENTO
              </Link>

            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/Formatos">
                <FontAwesomeIcon icon={faCogs} />
                CRUD FORMATOS
              </Link>
            </li>
          </ul>

          <hr className="my-3" />

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="#">
                <FontAwesomeIcon icon={faCogs} />
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="login-admin">
                <FontAwesomeIcon icon={faSignOutAlt} />
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
