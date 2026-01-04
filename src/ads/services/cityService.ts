import { apiClient } from '../../services/apiClient';
import type { CitySuggestion } from '../../types/api';

export const cityService = {
  getSuggestions: (query: string) =>
    apiClient.get<CitySuggestion[]>(`/cities/suggestions/?q=${query}`),

  getCityById: (id: string) =>
    apiClient.get<CitySuggestion>(`/cities/${id}`),
};
