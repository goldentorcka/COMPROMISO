import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL // Asegúrate de que esta URL sea la correcta
});

export default clienteAxios;
