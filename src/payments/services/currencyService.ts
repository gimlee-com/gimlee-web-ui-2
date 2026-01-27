import { apiClient } from '../../services/apiClient';
import type { ConversionResultDto, CurrencyInfoDto } from '../../types/api';

export const currencyService = {
  getCurrencies: async (): Promise<CurrencyInfoDto[]> => {
    return apiClient.get<CurrencyInfoDto[]>('/payments/currency/list');
  },

  convertCurrency: async (amount: number, from: string, to: string): Promise<ConversionResultDto> => {
    return apiClient.get<ConversionResultDto>(`/payments/currency/convert?amount=${amount}&from=${from}&to=${to}`);
  }
};
