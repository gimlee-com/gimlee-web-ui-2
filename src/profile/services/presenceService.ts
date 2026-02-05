import { apiClient } from '../../services/apiClient';
import type { UserPresenceDto, UpdateUserPresenceRequestDto, StatusResponseDto } from '../../types/api';

const presenceCache = new Map<string, { data: UserPresenceDto; timestamp: number }>();
const pendingRequests = new Map<string, Promise<UserPresenceDto>>();

export const presenceService = {
  ping: () =>
    apiClient.post<StatusResponseDto>('/user/ping'),

  getMyPresence: () =>
    apiClient.get<UserPresenceDto>('/user/me/presence'),

  updateMyPresence: (data: UpdateUserPresenceRequestDto) =>
    apiClient.patch<StatusResponseDto>('/user/me/presence', data),

  getUserPresence: (userName: string): Promise<UserPresenceDto> => {
    const now = Date.now();
    const cached = presenceCache.get(userName);

    if (cached && now - cached.timestamp < 60000) {
      return Promise.resolve(cached.data);
    }

    const pending = pendingRequests.get(userName);
    if (pending) {
      return pending;
    }

    const promise = apiClient.get<UserPresenceDto>(`/user/${userName}/presence`)
      .then((data) => {
        presenceCache.set(userName, { data, timestamp: Date.now() });
        pendingRequests.delete(userName);
        return data;
      })
      .catch((err) => {
        pendingRequests.delete(userName);
        throw err;
      });

    pendingRequests.set(userName, promise);
    return promise;
  },
};
