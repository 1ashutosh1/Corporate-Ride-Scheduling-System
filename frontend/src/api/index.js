import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,   //url of backend
});

// Now interceptor will attach token to each request automatically
// so token will be present in each request header
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
