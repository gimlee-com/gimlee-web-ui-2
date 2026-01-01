import { apiClient } from '../../services/apiClient';
import type { 
  AdDetailsDto, 
  PageAdPreviewDto, 
  CreateAdRequestDto, 
  UpdateAdRequestDto,
} from '../../types/api';

export const adService = {
  getFeaturedAds: () => 
    apiClient.get<PageAdPreviewDto>('/ads/featured'),

  searchAds: (params: any) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get<PageAdPreviewDto>(`/ads/?${query}`);
  },

  getAdById: (id: string) =>
    apiClient.get<AdDetailsDto>(`/ads/${id}`),

  getMyAds: () =>
    apiClient.get<PageAdPreviewDto>('/ads/my'),

  createAd: (data: CreateAdRequestDto) =>
    apiClient.post<AdDetailsDto>('/ads', data),

  updateAd: (id: string, data: UpdateAdRequestDto) =>
    apiClient.put<AdDetailsDto>(`/ads/${id}`, data),

  activateAd: (id: string) =>
    apiClient.post<AdDetailsDto>(`/ads/${id}/activate`),
};
