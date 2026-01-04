import { apiClient } from '../../services/apiClient';
import type { 
  PagePurchaseHistoryDto,
} from '../../types/api';

export const purchaseService = {
  getPurchases: (page: number = 0) =>
    apiClient.get<PagePurchaseHistoryDto>(`/purchases/?p=${page}`),
};
