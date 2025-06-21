import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { getCookie } from '@zizibot/utils/cookie';
import axios, { AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://engine-zizibot-dev.azhe.my.id',
  headers: {
    'Content-Type': 'application/json'
  },
  transformResponse: [
    (data) => {
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          return camelcaseKeys(parsed, { deep: true });
        } catch (error) {
          return data;
        }
      }
    }
  ],
  transformRequest: [
    (data) => {
      if (data && typeof data === 'object') {
        try {
          return JSON.stringify(snakecaseKeys(data, { deep: true }));
        } catch (error) {
          console.error('Request transformation error:', error);
          return data;
        }
      }
    }
  ]
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

