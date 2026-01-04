import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { userService } from '../profile/services/userService';
import i18n from '../i18n';

vi.mock('../profile/services/userService', () => ({
  userService: {
    getUserPreferences: vi.fn(),
  },
}));

vi.mock('../i18n', () => ({
  default: {
    changeLanguage: vi.fn(),
  },
}));

const TestComponent = () => {
  const { isAuthenticated } = useAuth();
  return <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and apply language preference when authenticated', async () => {
    const { apiClient } = await import('../services/apiClient');
    vi.spyOn(apiClient, 'getToken').mockReturnValue('fake-token');
    (userService.getUserPreferences as any).mockResolvedValue({ language: 'pl-PL' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(userService.getUserPreferences).toHaveBeenCalled();
      expect(i18n.changeLanguage).toHaveBeenCalledWith('pl-PL');
    });
  });

  it('should NOT fetch language preference when NOT authenticated', async () => {
    const { apiClient } = await import('../services/apiClient');
    vi.spyOn(apiClient, 'getToken').mockReturnValue(null);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(userService.getUserPreferences).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });

  it('should fetch language preference after calling login', async () => {
    const { apiClient } = await import('../services/apiClient');
    vi.spyOn(apiClient, 'getToken').mockReturnValue(null);
    (userService.getUserPreferences as any).mockResolvedValue({ language: 'en-US' });

    let loginFn: (token: string) => void = () => {};
    const TestLoginComponent = () => {
      const { login } = useAuth();
      loginFn = login;
      return null;
    };

    render(
      <AuthProvider>
        <TestLoginComponent />
      </AuthProvider>
    );

    expect(userService.getUserPreferences).not.toHaveBeenCalled();

    loginFn('new-token');

    await waitFor(() => {
      expect(userService.getUserPreferences).toHaveBeenCalled();
      expect(i18n.changeLanguage).toHaveBeenCalledWith('en-US');
    });
  });
});
