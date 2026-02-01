import { apiClient } from '../../services/apiClient';
import type { UserPresenceDto, UpdateUserPresenceRequestDto, StatusResponseDto } from '../../types/api';

export const presenceService = {
  ping: () =>
    apiClient.post<StatusResponseDto>('/user/ping'),

  getMyPresence: () =>
    apiClient.get<UserPresenceDto>('/user/me/presence'),

  updateMyPresence: (data: UpdateUserPresenceRequestDto) =>
    apiClient.patch<StatusResponseDto>('/user/me/presence', data),

  getUserPresence: (userId: string) =>
    apiClient.get<UserPresenceDto>(`/user/${userId}/presence`),
};
