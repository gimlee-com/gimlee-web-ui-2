import { apiClient } from '../../services/apiClient';
import type { PirateChainTransaction, YCashTransaction, CurrencyDto } from '../../types/api';

export const paymentService = {
  getCurrencies: () =>
    apiClient.get<CurrencyDto[]>('/payments/currency/list'),

  addPirateChainViewKey: (viewKey: string) =>
    apiClient.post<void>('/payments/piratechain/addresses/view-key', { viewKey }),

  getPirateChainTransactions: () =>
    apiClient.get<PirateChainTransaction[]>('/payments/piratechain/transactions'),

  addYCashViewKey: (viewKey: string) =>
    apiClient.post<void>('/payments/ycash/addresses/view-key', { viewKey }),

  getYCashTransactions: () =>
    apiClient.get<YCashTransaction[]>('/payments/ycash/transactions'),
};
