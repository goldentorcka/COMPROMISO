import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto de autenticación
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para iniciar sesión
    const login = (userData) => {
        setUser(userData);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validación de PropTypes para AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
