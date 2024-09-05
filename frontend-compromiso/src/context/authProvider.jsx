import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor del contexto de autenticación
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = ReactSession.get('token');
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const url = `/api/user/perfil`;
                const { data } = await clienteAxios(url, config);
                setAuth(data);
            } catch (error) {
                console.error(error.response?.data?.msg || "Error de autenticación");
                cerrarSesion(); // Limpiar sesión en caso de error
            }

            setCargando(false);
        };

        autenticarUsuario();
    }, []);

    const login = (userData, token) => {
        ReactSession.set('token', token);
        setAuth(userData);
    };

    const cerrarSesion = () => {
        ReactSession.remove('token');
        localStorage.clear();
        setAuth(null);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                login,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Validación de PropTypes para AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
