// home.jsx
import { Route, Routes, Link } from "react-router-dom";
import LoginFormAdmin from "../users/LoginUser.jsx";
import '../css/stylesHome.css';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta

const Home = () => {
    return (
        <div className="container">
            <img src={logo} alt="Logo Aplicativo" className="logo" />
            <h1>Bienvenidos al aplicativo COMPROMISO SENA</h1>
            <nav>
                <Link to="/login-admin" className="nav-link">Modulo del Administrador</Link>
                <Link to="/modulo-consulta" className="nav-link">Modulo de Consulta</Link>
            </nav>
            <div className="routes">
                <Routes>
                    <Route path="/login-admin" element={<LoginFormAdmin />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
