import { apiClient } from '../../services/apiClient';
import type { UserSpaceDto } from '../../types/api';

export const spacesService = {
  fetchUserSpace: (userName: string, page = 0, options?: RequestInit): Promise<UserSpaceDto> => {
    return apiClient.get<UserSpaceDto>(`/spaces/user/${userName}?page=${page}`, options);
  },
};
