import apiClient from '@zizibot/rest-client/utils/http-client';
import logDebug from '@zizibot/utils/logger';
import { CreatePendekinRequest, PendekinItem } from '@zizibot/contracts/rest-api/pendekin';
import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';

export async function useCreatePendekin(request: CreatePendekinRequest) {
  const response = await apiClient.post<ApiResponse<string>>('/api/pendekin', request);
  logDebug('create-pendekin', response);

  return response.data;
}

export async function useGetPendekin() {
  const response = await apiClient.get<ApiResponse<PendekinItem[]>>('/api/pendekin');
  logDebug('get-pendekin', response);

  return response.data;
}
