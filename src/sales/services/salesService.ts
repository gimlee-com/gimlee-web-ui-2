import { apiClient } from '../../services/apiClient';
import type { 
  AdDetailsDto, 
  PageAdPreviewDto, 
  CreateAdRequestDto, 
  UpdateAdRequestDto,
  PageSalesOrderDto,
  SalesOrderDto
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
    return apiClient.get<PageAdPreviewDto>(`/sales/ads/?${query.toString()}`);
  },

  createAd: (data: CreateAdRequestDto) =>
    apiClient.post<AdDetailsDto>('/sales/ads', data),

  getAdById: (id: string) =>
    apiClient.get<AdDetailsDto>(`/sales/ads/${id}`),

  updateAd: (id: string, data: UpdateAdRequestDto) =>
    apiClient.put<AdDetailsDto>(`/sales/ads/${id}`, data),

  activateAd: (id: string) =>
    apiClient.post<AdDetailsDto>(`/sales/ads/${id}/activate`),

  deactivateAd: (id: string) =>
    apiClient.post<AdDetailsDto>(`/sales/ads/${id}/deactivate`),

  getSalesOrders: (page: number = 0) =>
    apiClient.get<PageSalesOrderDto>(`/sales/orders/?p=${page}`),

  getSalesOrderById: (id: string) =>
    apiClient.get<SalesOrderDto>(`/sales/orders/${id}`),
};
