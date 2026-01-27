import { apiClient } from '../../services/apiClient';
import type { CategoryTreeDto, CategorySuggestionDto } from '../../types/api';

export const categoryService = {
  getRootCategories: (depth: number = 1) =>
    apiClient.get<CategoryTreeDto[]>(`/ads/categories?depth=${depth}`),

  getCategoryChildren: (categoryId: number) =>
    apiClient.get<CategoryTreeDto[]>(`/ads/categories/${categoryId}/children`),

  getSuggestions: (query: string) =>
    apiClient.get<CategorySuggestionDto[]>(`/ads/categories/suggestions?p=${query}`),
};
