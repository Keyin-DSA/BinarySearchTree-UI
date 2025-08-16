// src/api/client.js
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
});

export const buildTree = (numbers) =>
  api.post('/process-numbers', numbers).then((r) => r.data);
export const fetchPrevious = () =>
  api.get('/previous-trees').then((r) => r.data);
export default api;
