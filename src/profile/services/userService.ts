import { apiClient } from '../../services/apiClient';
import type { UserPreferencesDto, UpdateUserPreferencesRequestDto } from '../../types/api';

export const userService = {
  getUserPreferences: () => 
    apiClient.get<UserPreferencesDto>('/user/preferences'),
  
  updateUserPreferences: (data: UpdateUserPreferencesRequestDto) => 
    apiClient.put<UserPreferencesDto>('/user/preferences', data),
};
