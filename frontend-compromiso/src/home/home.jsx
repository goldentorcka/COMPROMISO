import { Route, Routes, Link } from "react-router-dom";
import { LoginFormAdmin } from "../users";
// import ReactSession from 'react-client-session';
// ReactSession.setStoreType("localStorage");


const Home = () => {
    return (
        <>
            <h1>Bienvenido al Home</h1>
            <nav>
                {/* Enlace para ir al formulario de inicio de sesión */}
                <Link to="/login-admin">Iniciar Sesión Admin</Link>
            </nav>

            {/* Configuración de las rutas */}
            <Routes>
                {/* Ruta para el componente LoginFormAdmin */}
                <Route path="/" element={<LoginFormAdmin />} />
            </Routes>
        </>
    );
};

export default Home;
