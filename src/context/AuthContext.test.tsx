import { render, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { userService } from '../profile/services/userService';
import { apiClient } from '../services/apiClient';
import i18n from '../i18n';

vi.mock('../profile/services/userService', () => ({
  userService: {
    getUserPreferences: vi.fn(),
  },
}));

vi.mock('../services/apiClient', () => ({
  apiClient: {
    getToken: vi.fn(),
    setToken: vi.fn(),
    get: vi.fn(),
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
    (apiClient.get as any).mockResolvedValue({
      accessToken: 'fake-token',
      userProfile: { userId: '1', avatarUrl: '', updatedAt: 0 }
    });
    (userService.getUserPreferences as any).mockResolvedValue({ language: 'pl-PL' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/session/init?decorators=accessToken,userProfile,preferredCurrency');
      expect(userService.getUserPreferences).toHaveBeenCalled();
      expect(i18n.changeLanguage).toHaveBeenCalledWith('pl-PL');
    });
  });

  it('should NOT fetch language preference when NOT authenticated', async () => {
    (apiClient.get as any).mockResolvedValue({
      accessToken: '',
      userProfile: null
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledWith('/session/init?decorators=accessToken,userProfile,preferredCurrency');
    });
    
    expect(userService.getUserPreferences).not.toHaveBeenCalled();
    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });

  it('should fetch language preference after calling login', async () => {
    // Initial session check returns empty
    (apiClient.get as any).mockResolvedValueOnce({
      accessToken: '',
      userProfile: null
    });
    
    // Second call (after login) returns authenticated session
    (apiClient.get as any).mockResolvedValueOnce({
      accessToken: 'new-token',
      userProfile: { userId: '1', avatarUrl: '', updatedAt: 0 }
    });

    (userService.getUserPreferences as any).mockResolvedValue({ language: 'en-US' });

    let loginFn: (token: string) => Promise<void> = async () => {};
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

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(1);
    });

    expect(userService.getUserPreferences).not.toHaveBeenCalled();

    await act(async () => {
      await loginFn('new-token');
    });

    await waitFor(() => {
      expect(apiClient.get).toHaveBeenCalledTimes(2);
      expect(userService.getUserPreferences).toHaveBeenCalled();
      expect(i18n.changeLanguage).toHaveBeenCalledWith('en-US');
    });
  });
});
