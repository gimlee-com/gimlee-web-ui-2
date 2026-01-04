import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from './userService';
import { apiClient } from '../../services/apiClient';

vi.mock('../../services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user preferences', async () => {
    const mockPrefs = { language: 'pl-PL' };
    (apiClient.get as any).mockResolvedValue(mockPrefs);

    const result = await userService.getUserPreferences();

    expect(apiClient.get).toHaveBeenCalledWith('/user/preferences');
    expect(result).toEqual(mockPrefs);
  });

  it('should update user preferences', async () => {
    const mockPrefs = { language: 'en-US' };
    (apiClient.put as any).mockResolvedValue(mockPrefs);

    const result = await userService.updateUserPreferences({ language: 'en-US' });

    expect(apiClient.put).toHaveBeenCalledWith('/user/preferences', { language: 'en-US' });
    expect(result).toEqual(mockPrefs);
  });
});
