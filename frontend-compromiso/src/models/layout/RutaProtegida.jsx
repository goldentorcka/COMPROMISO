import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

const RutaProtegida = ({ children }) => {
    const { auth } = useAuth(); // Obteniendo el estado de autenticación desde el hook personalizado

    // Si el usuario no está autenticado, redirige al login
    if (!auth || !auth.token) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, permite el acceso a las rutas protegidas
    return children;
};

export default RutaProtegida;
