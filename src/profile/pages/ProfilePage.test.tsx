import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfilePage from './ProfilePage';
import { AuthProvider } from '../../context/AuthContext';
import { userService } from '../services/userService';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../services/userService', () => ({
  userService: {
    getUserPreferences: vi.fn(),
    updateUserPreferences: vi.fn(),
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
    // Mock authenticated state by ensuring apiClient has a token
    // Actually, AuthContext checks apiClient.getToken()
    const { apiClient } = await import('../../services/apiClient');
    vi.spyOn(apiClient, 'getToken').mockReturnValue('fake-token');

    render(
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <MemoryRouter>
            <ProfilePage />
          </MemoryRouter>
        </AuthProvider>
      </I18nextProvider>
    );

    const polishButton = screen.getByRole('button', { name: /Polski/i });
    fireEvent.click(polishButton);

    expect(i18n.language).toBe('pl-PL');
    expect(localStorage.setItem).toHaveBeenCalled();
    await waitFor(() => {
      expect(userService.updateUserPreferences).toHaveBeenCalledWith({ language: 'pl-PL' });
    });
  });

  it('should NOT call updateUserPreferences when language is changed and user is NOT authenticated', async () => {
    const { apiClient } = await import('../../services/apiClient');
    vi.spyOn(apiClient, 'getToken').mockReturnValue(null);

    render(
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <MemoryRouter>
            <ProfilePage />
          </MemoryRouter>
        </AuthProvider>
      </I18nextProvider>
    );

    const englishButton = screen.getByRole('button', { name: /English/i });
    fireEvent.click(englishButton);

    expect(i18n.language).toBe('en-US');
    expect(userService.updateUserPreferences).not.toHaveBeenCalled();
  });
});
