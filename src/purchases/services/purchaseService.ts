import { apiClient } from '../../services/apiClient';
import type { 
  PagePurchaseHistoryDto,
  PurchaseRequestDto,
  PurchaseResponseDto,
  PurchaseStatusResponseDto
} from '../../types/api';

export const purchaseService = {
  getPurchases: (page: number = 0) =>
    apiClient.get<PagePurchaseHistoryDto>(`/purchases/?p=${page}`),

  createPurchase: (data: PurchaseRequestDto) =>
    apiClient.post<PurchaseResponseDto>('/purchases', data),

  getPurchaseStatus: (purchaseId: string) =>
    apiClient.get<PurchaseStatusResponseDto>(`/purchases/${purchaseId}/status`),

  cancelPurchase: (purchaseId: string) =>
    apiClient.post<void>(`/purchases/${purchaseId}/cancel`),
};
