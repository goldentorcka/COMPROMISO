import axios from 'axios';

// Crear una instancia de Axios
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export default clienteAxios;

// import axios from "axios";

// const clieteAxios = axios.create({
//   baseURL: "http://localhost:1337", // Asegúrate de que esta URL sea correcta
//   // Puedes agregar más configuraciones aquí si es necesario
// });

// export default clieteAxios;
