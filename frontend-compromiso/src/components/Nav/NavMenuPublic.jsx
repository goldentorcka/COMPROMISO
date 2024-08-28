import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from '../../Public/images/logo.ico'; 

const NavMenuPublic = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login-admin");
  };

  return (
    <>
      <header
        className="d-flex flex-wrap align-items-center justify-content-between py-3 px-4 fixed-top shadow-sm bg-light"
        style={{ fontSize: "1.5rem", height: "80px", zIndex: 1000 }}
      >
        <div className="d-flex align-items-center">
          <a
            href="/"
            className="d-inline-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="50"
              className="d-inline-block align-top"
            />
          </a>
        </div>

        <ul className="nav col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-3 link-secondary">
              Home
            </a>
          </li>
          <li>
            <a href="/contacts" className="nav-link px-3">
              Contacts
            </a>
          </li>
          <li>
            <a href="/Manuals" className="nav-link px-3">
              Manuals
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-3">
              ¿Que es Sena Empresa?
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-3">
              Mision y Vision
            </a>
          </li>
        </ul>

        <div className="text-end">
          <button 
            type="button" 
            className="btn btn-outline-primary me-3"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </header>
      <div style={{ paddingTop: "80px" }}></div>
    </>
  );
};

export default NavMenuPublic;
