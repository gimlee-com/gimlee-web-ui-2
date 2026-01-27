import { apiClient } from '../../services/apiClient';
import type { 
  AdDetailsDto, 
  PageAdPreviewDto, 
  CreateAdRequestDto, 
  UpdateAdRequestDto,
} from '../../types/api';

export const adService = {
  getFeaturedAds: (options?: RequestInit) => 
    apiClient.get<PageAdPreviewDto>('/ads/featured/', options),

  searchAds: (params: any, options?: RequestInit) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get<PageAdPreviewDto>(`/ads/?${query}`, options);
  },

  getAdById: (id: string, options?: RequestInit) =>
    apiClient.get<AdDetailsDto>(`/ads/${id}`, options),

  getMyAds: (options?: RequestInit) =>
    apiClient.get<PageAdPreviewDto>('/ads/my', options),

  createAd: (data: CreateAdRequestDto) =>
    apiClient.post<AdDetailsDto>('/ads', data),

  updateAd: (id: string, data: UpdateAdRequestDto) =>
    apiClient.put<AdDetailsDto>(`/ads/${id}`, data),

  activateAd: (id: string) =>
    apiClient.post<AdDetailsDto>(`/ads/${id}/activate`),
};
