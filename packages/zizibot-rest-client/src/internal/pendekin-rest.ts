import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { CreatePendekinRequest, PendekinItem } from '@zizibot/contracts/rest-api/pendekin';
import { apiClient, deconstructResponse } from '@zizibot/rest-client/utils/http-client';

export async function useCreatePendekin(request: CreatePendekinRequest) {
  const response = await apiClient.post<ApiResponse<string>>('/api/pendekin', request);
  return deconstructResponse(response);
}

export async function useGetPendekin() {
  const response = await apiClient.get<ApiResponse<PendekinItem[]>>('/api/pendekin');
  return deconstructResponse(response);
}
