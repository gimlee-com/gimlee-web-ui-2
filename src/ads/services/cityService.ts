import { apiClient } from '../../services/apiClient';
import type { CitySuggestion, CityDetailsDto } from '../../types/api';

export const cityService = {
  getSuggestions: (query: string) =>
    apiClient.get<CitySuggestion[]>(`/cities/suggestions/?p=${query}`),

  getCityById: (id: string) =>
    apiClient.get<CityDetailsDto>(`/cities/${id}`),
};
