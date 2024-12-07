import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { TelegramUserLogin, TelegramUserLoginResponse, UserSessionInfo } from '@zizibot/contracts/rest-api/user-login';
import { apiClient, deconstructResponse } from '@zizibot/rest-client/utils/http-client';

export async function validateTelegramSession(data: TelegramUserLogin) {
  const response = await apiClient.post<ApiResponse<TelegramUserLoginResponse>>('/api/user/session/telegram', data);
  return deconstructResponse(response);
}

export async function validateCurrentSession() {
  const response = await apiClient.post<ApiResponse<TelegramUserLoginResponse>>('/api/user/session/validate', {});
  return deconstructResponse(response);
}

export async function getUserInfo() {
  const response = await apiClient.get<ApiResponse<UserSessionInfo>>('/api/user/info');
  return deconstructResponse(response);
}
