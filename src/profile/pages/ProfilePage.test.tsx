import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfilePage from './ProfilePage';
import { AuthProvider } from '../../context/AuthContext';
import { userService } from '../services/userService';
import { apiClient } from '../../services/apiClient';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../services/userService', () => ({
  userService: {
    getUserPreferences: vi.fn(),
    updateUserPreferences: vi.fn(),
  },
}));

vi.mock('../../services/apiClient', () => ({
  apiClient: {
    getToken: vi.fn(),
    setToken: vi.fn(),
    get: vi.fn(),
  },
}));

vi.mock('../../payments/services/paymentService', () => ({
  paymentService: {
    getPirateChainTransactions: vi.fn().mockResolvedValue([]),
    addPirateChainViewKey: vi.fn(),
    getYCashTransactions: vi.fn().mockResolvedValue([]),
    addYCashViewKey: vi.fn(),
  },
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (userService.getUserPreferences as any).mockResolvedValue({ language: 'en-US' });
  });

  it('should call updateUserPreferences when language is changed and user is authenticated', async () => {
    (apiClient.get as any).mockResolvedValue({
      accessToken: 'fake-token',
      userProfile: { userId: '1', avatarUrl: '', updatedAt: 0 }
    });
    (userService.getUserPreferences as any).mockResolvedValue({ language: 'en-US' });

    render(
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <MemoryRouter>
            <ProfilePage />
          </MemoryRouter>
        </AuthProvider>
      </I18nextProvider>
    );

    const polishButton = await screen.findByRole('button', { name: /Polski/i });
    fireEvent.click(polishButton);

    expect(i18n.language).toBe('pl-PL');
    expect(localStorage.setItem).toHaveBeenCalled();
    await waitFor(() => {
      expect(userService.updateUserPreferences).toHaveBeenCalledWith({ language: 'pl-PL' });
    });
  });

  it('should NOT call updateUserPreferences when language is changed and user is NOT authenticated', async () => {
    (apiClient.get as any).mockResolvedValue({
      accessToken: '',
      userProfile: null
    });

    render(
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <MemoryRouter>
            <ProfilePage />
          </MemoryRouter>
        </AuthProvider>
      </I18nextProvider>
    );

    const englishButton = await screen.findByRole('button', { name: /English/i });
    fireEvent.click(englishButton);

    expect(i18n.language).toBe('en-US');
    expect(userService.updateUserPreferences).not.toHaveBeenCalled();
  });
});
