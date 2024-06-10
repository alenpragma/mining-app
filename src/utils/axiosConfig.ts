// src/utils/axiosConfig.js
import axios from 'axios';
import { logout } from './auth';
import getTizaraAdminToken, { userToken } from '../hooks/getTokenFromstorage';

const axiosInstance = axios.create({
  baseURL: 'https://biztoken.fecotrade.com/api', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers here
  },
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getTizaraAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
