import apiClient from '@zizibot/rest-client/utils/http-client';
import { TelegramUserLogin, TelegramUserLoginResponse, UserSessionInfo } from '@zizibot/contracts/rest-api/user-login';
import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';

export async function validateTelegramSession(data: TelegramUserLogin) {
  const response = await apiClient.post<ApiResponse<TelegramUserLoginResponse>>('/api/user/session/telegram', data);
  console.debug('auth telegram', response);

  return response.data;
}

export async function validateCurrentSession() {
  const response = await apiClient.post<ApiResponse<TelegramUserLoginResponse>>('/api/user/session/validate', {});
  return response.data;
}

export async function getUserInfo() {
  const response = await apiClient.get<ApiResponse<UserSessionInfo>>('/api/user/info');
  console.debug('get user info', response);

  return response.data;
}
