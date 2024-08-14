// src/services/api.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export const fetchProcesos = async () => {
  try {
    const response = await axios.get(`${apiUrl}/procesos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching procesos:', error);
    throw error;
  }
};
