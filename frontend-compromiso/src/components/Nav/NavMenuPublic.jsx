import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../Public/images/logos/logo.png'; 
import { FaHome, FaUser, FaBook, FaHistory, FaEye, FaCog } from 'react-icons/fa';


const NavMenuPublic = () => {
  const [activeLink, setActiveLink] = useState(""); 
  const navigate = useNavigate();

  const handleConsultaClick = () => {
    navigate("/modulo-consulta");
  };

  const handleLoginClick = () => {
    navigate("/login-admin");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Actualiza el enlace activo
  };

  // Definir los colores
  const primaryColor = "#282c34"; 
  const activeColor = "#61dafb"; 
  const textColor = "#ffffff";

  // Estilos en línea
  const headerStyle = {
    fontSize: "1.2rem",
    height: "70px",
    zIndex: 1000,
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: primaryColor,
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
    boxSizing: "border-box", 
  };

  const logoStyle = {
    width: "50px",
    height: "40px",
  };

  const navLinkStyle = {
    padding: "10px 15px",
    textDecoration: "none",
    color: textColor,
    backgroundColor: primaryColor,
    borderRadius: "4px",
    transition: "background-color 0.3s, color 0.3s, transform 0.3s", 
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const activeLinkStyle = {
    backgroundColor: activeColor, // Azul cuando está activo
    color: primaryColor, // Texto oscuro cuando activo
    fontWeight: "bold",
  };

  const btnStyle = {
    color: textColor,
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    marginRight: "10px",
    boxSizing: "border-box", 
    transition: "background-color 0.3s, color 0.3s", 
  };

  const iconStyle = {
    transition: "transform 0.3s", // Transición para la rotación
  };

  return (
    <>
      <header
        className="d-flex flex-wrap align-items-center justify-content-between py-3 px-4 shadow-sm"
        style={headerStyle}
      >
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="d-inline-flex align-items-center text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              style={logoStyle}
              className="d-inline-block align-top"
            />
          </Link>
        </div>

        <ul className="nav col-md-auto mb-2 justify-content-center mb-md-0" style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <Link
              to="/"
              className="nav-link"
              style={{ 
                ...navLinkStyle, 
                ...(activeLink === "/" ? activeLinkStyle : {}) // Mantener estilo activo si es el link actual
              }}
              onClick={() => handleLinkClick("/")}
            >
              <FaHome style={activeLink === "/" ? { ...iconStyle, transform: "rotate(360deg)" } : iconStyle} /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="nav-link"
              style={{ 
                ...navLinkStyle, 
                ...(activeLink === "/contacts" ? activeLinkStyle : {}) 
              }}
              onClick={() => handleLinkClick("/contacts")}
            >
              <FaUser style={activeLink === "/contacts" ? { ...iconStyle, transform: "rotate(360deg)" } : iconStyle} /> Contacts
            </Link>
          </li>
          <li>
            <Link
              to="/manuals"
              className="nav-link"
              style={{ 
                ...navLinkStyle, 
                ...(activeLink === "/manuals" ? activeLinkStyle : {}) 
              }}
              onClick={() => handleLinkClick("/manuals")}
            >
              <FaBook style={activeLink === "/manuals" ? { ...iconStyle, transform: "rotate(360deg)" } : iconStyle} /> Manuals
            </Link>
          </li>
          <li>
            <Link
              to="/reseña-historica"
              className="nav-link"
              style={{ 
                ...navLinkStyle, 
                ...(activeLink === "/reseña-historica" ? activeLinkStyle : {}) 
              }}
              onClick={() => handleLinkClick("/reseña-historica")}
            >
              <FaHistory style={activeLink === "/reseña-historica" ? { ...iconStyle, transform: "rotate(360deg)" } : iconStyle} /> Reseña Historica
            </Link>
          </li>
          <li>
            <Link
              to="/mision-vision"
              className="nav-link"
              style={{ 
                ...navLinkStyle, 
                ...(activeLink === "/mision-vision" ? activeLinkStyle : {}) 
              }}
              onClick={() => handleLinkClick("/mision-vision")}
            >
              <FaCog style={activeLink === "/mision-vision" ? { ...iconStyle, transform: "rotate(360deg)" } : iconStyle} /> Mision y Vision
            </Link>
          </li>
        </ul>

        <div className="text-end" style={{ marginLeft: "auto" }}>
          <button
            type="button"
            className="btn"
            style={btnStyle}
            onClick={handleLoginClick}
          >
            <FaCog style={{ ...iconStyle }} /> Módulo del Administrador
          </button>
          <button
            type="button"
            className="btn"
            style={btnStyle}
            onClick={handleConsultaClick}
          >
            <FaEye style={{ ...iconStyle }} /> Consulta
          </button>
        </div>
      </header>
    </>
  );
};

export default NavMenuPublic;