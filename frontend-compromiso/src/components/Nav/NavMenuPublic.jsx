import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import logo from '../../Public/images/logos/logo.ico';

const NavMenuPublic = () => {
  const [activeLink, setActiveLink] = useState(""); // Estado para el link activo
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login-admin");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link); // Actualiza el estado con el link activo
  };

  // Estilos en línea
  const headerStyle = {
    fontSize: "1.2rem",
    height: "70px",
    zIndex: 1000,
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
  };

  const logoStyle = {
    width: "50px",
    height: "40px",
  };

  const navLinkStyle = {
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: "#000",
    transition: "transform 0.3s, background-color 0.3s", // Añadido para animaciones suaves
  };

  const activeLinkStyle = {
    color: "#007bff",
    fontWeight: "bold",
    backgroundColor: "#e9ecef",
    borderRadius: "5px",
  };

  const btnOutlinePrimaryStyle = {
    borderColor: "#007bff",
    color: "#007bff",
  };

  const btnOutlinePrimaryHoverStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
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
                ...(activeLink === "/" ? activeLinkStyle : {}) 
              }}
              onClick={() => handleLinkClick("/")}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} // Animación de escala
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} // Restablecimiento
            >
              Home
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
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} // Animación de escala
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} // Restablecimiento
            >
              Contacts
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
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} // Animación de escala
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} // Restablecimiento
            >
              Manuals
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
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} // Animación de escala
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} // Restablecimiento
            >
              Reseña Historica
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
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"} // Animación de escala
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} // Restablecimiento
            >
              Mision y Vision
            </Link>
          </li>
        </ul>

        <div className="text-end" style={{ marginLeft: "auto" }}>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={btnOutlinePrimaryStyle}
            onClick={handleLoginClick}
            onMouseOver={(e) => e.currentTarget.style = { ...btnOutlinePrimaryStyle, ...btnOutlinePrimaryHoverStyle }}
            onMouseOut={(e) => e.currentTarget.style = btnOutlinePrimaryStyle}
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
