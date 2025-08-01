import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.4:3000', //local ip of system
});

// API.get('/api/rides', { headers: { Authorization: `Bearer ${token}` } })

export default API;
