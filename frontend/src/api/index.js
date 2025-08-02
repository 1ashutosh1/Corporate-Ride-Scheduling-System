import axios from 'axios';

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,   //url of backend
});

// API.get('/api/rides', { headers: { Authorization: `Bearer ${token}` } })

export default API;
