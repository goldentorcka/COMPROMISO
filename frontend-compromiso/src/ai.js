// ai.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337',
});

const predict = async (input) => {
  const response = await api.post('/predict', { input });
  return response.data.output;
};

export default predict;