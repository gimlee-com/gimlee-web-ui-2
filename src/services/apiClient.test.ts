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
  });

  it('should not redirect and throw "Not Found" on 403 error', async () => {
    (fetch as any).mockResolvedValue({
      status: 403,
      ok: false,
      json: () => Promise.resolve({ message: 'Forbidden' }),
    });

    let error: any;
    try {
      await apiClient.get('/test');
    } catch (e) {
      error = e;
    }

    expect(window.location.href).not.toContain('/login');
    expect(error.message).toBe('Not Found');
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
