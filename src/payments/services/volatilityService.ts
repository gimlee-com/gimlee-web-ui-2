import { apiClient } from '../../services/apiClient';
import type { VolatilityStatusDto } from '../../types/api';

export const volatilityService = {
  getStatus: (options?: RequestInit) =>
    apiClient.get<VolatilityStatusDto[]>('/payments/volatility/status', options),
};
