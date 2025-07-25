import { ApiResponse } from '@zizibot/contracts/rest-api/api-response';
import { CreatePendekinRequest, PendekinItem, PendekinItemDetail } from '@zizibot/contracts/rest-api/pendekin';
import { apiClient, deconstructResponse } from '@zizibot/rest-client/utils/http-client';

export async function useCreatePendekin(request: CreatePendekinRequest) {
  const response = await apiClient.post<ApiResponse<string>>('/api/pendekin', request);
  return deconstructResponse(response);
}

export async function useGetListPendekin() {
  const response = await apiClient.get<ApiResponse<PendekinItem[]>>('/api/pendekin');
  return deconstructResponse(response);
}

export async function useGetPendekin(pendekinPath: string) {
  const response = await apiClient.get<ApiResponse<PendekinItemDetail>>(`/api/pendekin/${pendekinPath}`);
  return deconstructResponse(response);
}

export async function useDeletePendekin(pendekinPath: string) {
  const response = await apiClient.delete<ApiResponse<string>>(`/api/pendekin/${pendekinPath}`);
  return deconstructResponse(response);
}
