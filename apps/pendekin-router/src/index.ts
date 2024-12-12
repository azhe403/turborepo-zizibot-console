import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { PendekinItemDetail } from '@zizibot/contracts/rest-api/pendekin';
import { deconstructResponse } from '@zizibot/rest-client/utils/http-client';
import axios from 'axios';
import { Hono } from 'hono';
import { env } from 'hono/adapter';

const app = new Hono();

const axiosClient = (baseUrl: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl
  });

  axiosInstance.defaults.validateStatus = status => status >= 200 && status <= 500;
  return axiosInstance;
};

app.get('/', (c) => {
  return c.json({
    message: 'Welcome To Pendekin Router!'
  });
});

app.get('/:pendekinPath', async c => {
  const pendekinPath = c.req.param('pendekinPath');
  const { API_BASE_URL } = env<{ API_BASE_URL: string }>(c);

  const axiosInstance = axiosClient(API_BASE_URL);
  const axiosResponse = await axiosInstance.get<ApiResponse<PendekinItemDetail>>(`/api/pendekin/${pendekinPath}`);
  const { status, result, data } = deconstructResponse(axiosResponse);

  if (status === 200) {
    return c.redirect(result.originalUrl);
  }

  return c.json({
    executionTime: data.executionTime,
    message: 'Route not found!'
  });
});

export default app;
