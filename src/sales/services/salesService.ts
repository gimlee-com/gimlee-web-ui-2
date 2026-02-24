import { apiClient } from '../../services/apiClient';
import type { 
  AdDto, 
  PageAdDto, 
  CreateAdRequestDto, 
  UpdateAdRequestDto,
  PageSalesOrderDto,
  SalesOrderDto,
  AllowedCurrenciesDto
} from '../../types/api';

export interface SalesAdsRequestDto {
  t?: string;
  s?: ('ACTIVE' | 'INACTIVE' | 'DELETED')[];
  by: 'CREATED_DATE';
  dir: 'ASC' | 'DESC';
  p: number;
}

export const salesService = {
  getMyAds: (params: SalesAdsRequestDto) => {
    const query = new URLSearchParams();
    if (params.t) query.append('t', params.t);
    if (params.s) params.s.forEach(status => query.append('s', status));
    query.append('by', params.by);
    query.append('dir', params.dir);
    query.append('p', params.p.toString());
    return apiClient.get<PageAdDto>(`/sales/ads/?${query.toString()}`);
  },

  createAd: (data: CreateAdRequestDto) =>
    apiClient.post<AdDto>('/sales/ads', data),

  getAdById: (id: string) =>
    apiClient.get<AdDto>(`/sales/ads/${id}`),

  getAllowedCurrencies: () =>
    apiClient.get<AllowedCurrenciesDto>('/sales/ads/allowed-currencies'),

  updateAd: (id: string, data: UpdateAdRequestDto) =>
    apiClient.put<AdDto>(`/sales/ads/${id}`, data),

  activateAd: (id: string) =>
    apiClient.post<AdDto>(`/sales/ads/${id}/activate`),

  deactivateAd: (id: string) =>
    apiClient.post<AdDto>(`/sales/ads/${id}/deactivate`),

  getSalesOrders: (page: number = 0) =>
    apiClient.get<PageSalesOrderDto>(`/sales/orders/?p=${page}`),

  getSalesOrderById: (id: string) =>
    apiClient.get<SalesOrderDto>(`/sales/orders/${id}`),
};
