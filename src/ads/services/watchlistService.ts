import { apiClient } from '../../services/apiClient';
import type { AdDiscoveryPreviewDto, StatusResponseDto } from '../../types/api';

export const watchlistService = {
  addToWatchlist: (adId: string) =>
    apiClient.post<StatusResponseDto>(`/user/watchlist/${adId}`),

  removeFromWatchlist: (adId: string) =>
    apiClient.delete<StatusResponseDto>(`/user/watchlist/${adId}`),

  getMyWatchedAds: (options?: RequestInit) =>
    apiClient.get<AdDiscoveryPreviewDto[]>('/user/watchlist/ads', options),
};
