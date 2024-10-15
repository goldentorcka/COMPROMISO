import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from '../../../Public/images/logo.png';
import { FaUser, FaBook, FaHistory, FaEye, FaCog } from 'react-icons/fa';

const NavMenuPublic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [rotatingIcon, setRotatingIcon] = useState(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (to) => {
    setActiveLink(to);
    setRotatingIcon(to);
    
    // Aquí usas navigate para redirigir a la ruta deseada
    navigate(to);
  
    setTimeout(() => {
      setRotatingIcon(null);
    }, 1000);
  };
  

  const handleMouseEnter = (to) => {
    setRotatingIcon(to);
  };

  const handleMouseLeave = () => {
    setRotatingIcon(null);
  };

  const navLinkStyle = (isActive) => ({
    padding: "8px 12px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: isActive ? "#00bcd4" : "#333",
    borderRadius: "5px",
    transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
    textTransform: "uppercase",
    fontWeight: isActive ? "bold" : "normal",
    transform: isActive ? "scale(1.05)" : "none",
    boxShadow: isActive ? "0px 0px 10px rgba(0, 188, 212, 0.7)" : "none",
    cursor: "pointer",
  });

  const iconStyle = (isRotating) => ({
    fontSize: "1.5rem",
    transition: "transform 0.5s ease",
    transform: isRotating ? "rotate(360deg)" : "none",
  });

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? "#00a1a6" : "#00bcd4",
    color: "#fff",
    padding: "10px 20px",
    margin: "0 10px",
    borderRadius: "5px",
    border: "none",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold",
  });

  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-between py-3 px-4 shadow-sm"
      style={{
        backgroundColor: "#333",
        height: "80px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <div className="d-flex align-items-center">
        <Link to="/" className="d-inline-flex align-items-center text-decoration-none">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "60px", height: "50px" }}
            className="d-inline-block align-top"
          />
        </Link>
      </div>

      <ul
        className="nav col-md-auto mb-2 justify-content-center mb-md-0"
        style={{ display: "flex", justifyContent: "center", listStyle: "none", padding: 0, margin: 0 }}
      >
        {[
          { to: "/contacts", icon: <FaUser />, label: "Contacts" },
          { to: "/manuals", icon: <FaBook />, label: "Manuals" },
          { to: "/resena-historica", icon: <FaHistory />, label: "Reseña Historica" },
          { to: "/mision-vision", icon: <FaCog />, label: "Misión y Visión" },
        ].map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="nav-link"
              style={navLinkStyle(activeLink === to)}
              onClick={() => handleLinkClick(to)}
              onMouseEnter={() => handleMouseEnter(to)}
              onMouseLeave={handleMouseLeave}
            >
              {React.cloneElement(icon, { style: iconStyle(rotatingIcon === to) })} {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-end" style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          style={buttonStyle(activeLink === "/login")}
          onClick={() => handleLinkClick("/login")}
          onMouseEnter={() => handleMouseEnter("/login")}
          onMouseLeave={handleMouseLeave}
        >
          <FaCog style={iconStyle(rotatingIcon === "/login")} /> Módulo del Administrador
        </button>
        <button
          type="button"
          className="btn"
          style={buttonStyle(activeLink === "/modulo-consulta")}
          onClick={() => handleLinkClick("/modulo-consulta")}
          onMouseEnter={() => handleMouseEnter("/modulo-consulta")}
          onMouseLeave={handleMouseLeave}
        >
          <FaEye style={iconStyle(rotatingIcon === "/modulo-consulta")} /> Consulta
        </button>
      </div>
    </header>
  );
};

export default NavMenuPublic;
