import { vi } from 'vitest';
import '@testing-library/jest-dom';

const storage: Record<string, string> = {};
global.localStorage = {
  getItem: vi.fn((key) => storage[key] || null),
  setItem: vi.fn((key, value) => { storage[key] = value; }),
  removeItem: vi.fn((key) => { delete storage[key]; }),
  clear: vi.fn(() => { Object.keys(storage).forEach(key => delete storage[key]); }),
  length: 0,
  key: vi.fn(),
} as any;
