import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { getCookie } from '@zizibot/utils/cookie';
import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://console-zizibot-dev.azhe.my.id',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.defaults.validateStatus = status => status >= 200 && status <= 500;

apiClient.interceptors.request.use(config => {
  const token = getCookie('bearerToken');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

function deconstructResponse<T>(response: AxiosResponse<ApiResponse<T>>) {
  return {
    response,
    status: response.status,
    data: response.data,
    message: response.data.message,
    result: response.data.result
  };
}


export {
  apiClient,
  deconstructResponse
};

