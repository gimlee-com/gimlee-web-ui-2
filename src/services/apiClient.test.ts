import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.hoisted(() => {
  const storage: Record<string, string> = {};
  global.localStorage = {
    getItem: vi.fn((key) => storage[key] || null),
    setItem: vi.fn((key, value) => { storage[key] = value; }),
    removeItem: vi.fn((key) => { delete storage[key]; }),
    clear: vi.fn(() => { Object.keys(storage).forEach(key => delete storage[key]); }),
    length: 0,
    key: vi.fn(),
  } as any;
});

import { apiClient } from './apiClient';
import i18n from '../i18n';

describe('ApiClient', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;
    window.location = { ...originalLocation, href: '', pathname: '/current-page', search: '?q=test' } as any;
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    // @ts-ignore
    window.location = originalLocation;
    vi.restoreAllMocks();
  });

  it('should include Accept-Language header matching i18n language', async () => {
    (fetch as any).mockResolvedValue({
      status: 200,
      ok: true,
      json: () => Promise.resolve({}),
    });

    // Mock i18n language
    const originalLanguage = i18n.language;
    Object.defineProperty(i18n, 'language', { value: 'pl-PL', configurable: true });

    await apiClient.get('/test');

    const fetchCall = (fetch as any).mock.calls[0];
    const headers = fetchCall[1].headers;
    expect(headers.get('Accept-Language')).toBe('pl-PL');

    // Restore i18n language
    Object.defineProperty(i18n, 'language', { value: originalLanguage, configurable: true });
  });

  it('should redirect to login on 401 error', async () => {
    (fetch as any).mockResolvedValue({
      status: 401,
      ok: false,
      json: () => Promise.resolve({ message: 'Unauthorized' }),
    });

    try {
      await apiClient.get('/test');
    } catch (e) {
      // expected error
    }

    expect(window.location.href).toContain('/login');
    expect(window.location.href).toContain('redirect=' + encodeURIComponent('/current-page?q=test'));
    expect(window.location.href).toContain('reason=unauthorized');
  });

  it('should not redirect and throw error from body on 403 error', async () => {
    (fetch as any).mockResolvedValue({
      status: 403,
      ok: false,
      json: () => Promise.resolve({ message: 'Forbidden localized message' }),
    });

    let error: any;
    try {
      await apiClient.get('/test');
    } catch (e) {
      error = e;
    }

    expect(window.location.href).not.toContain('/login');
    expect(error.message).toBe('Forbidden localized message');
  });

  it('should not clear token on 403 error', async () => {
    apiClient.setToken('existing-token');
    (fetch as any).mockResolvedValue({
      status: 403,
      ok: false,
      json: () => Promise.resolve({ message: 'Forbidden' }),
    });

    try {
      await apiClient.get('/test');
    } catch (e) {}

    expect(apiClient.getToken()).toBe('existing-token');
  });
});
