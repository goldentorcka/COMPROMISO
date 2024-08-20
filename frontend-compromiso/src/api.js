// frontend-compromiso/src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3002';

export const fetchData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/procesos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
// Agrega otras funciones para POST, PUT, DELETE según sea necesario
