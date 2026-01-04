import { apiClient } from '../../services/apiClient';
import type { 
  PurchaseRequestDto, 
  PurchaseResponseDto, 
  PurchaseStatusResponseDto 
} from '../../types/api';

export const purchaseService = {
  createPurchase: (data: PurchaseRequestDto) =>
    apiClient.post<PurchaseResponseDto>('/purchases', data),

  getPurchaseStatus: (purchaseId: string) =>
    apiClient.get<PurchaseStatusResponseDto>(`/purchases/${purchaseId}/status`),

  cancelPurchase: (purchaseId: string) =>
    apiClient.post<void>(`/purchases/${purchaseId}/cancel`),
};
