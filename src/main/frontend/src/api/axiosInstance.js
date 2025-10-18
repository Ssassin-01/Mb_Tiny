// src/api/axiosInstance.js
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:8080/api' : '/api',
  withCredentials: true,
});

export default instance;
