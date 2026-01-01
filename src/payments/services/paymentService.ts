import { apiClient } from '../../services/apiClient';
import type { PirateChainTransaction } from '../../types/api';

export const paymentService = {
  addPirateChainViewKey: (viewKey: string) =>
    apiClient.post<void>('/payments/piratechain/addresses/view-key', { viewKey }),

  getPirateChainTransactions: () =>
    apiClient.get<PirateChainTransaction[]>('/payments/piratechain/transactions'),
};
