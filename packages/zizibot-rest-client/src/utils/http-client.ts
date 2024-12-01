import axios from 'axios';
import { getCookie } from '@zizibot/utils/cookie';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = getCookie('bearerToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

export default apiClient;
