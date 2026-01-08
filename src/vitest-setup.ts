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
} as unknown as Storage;

global.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as unknown as typeof IntersectionObserver;

global.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as unknown as typeof ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill DOMMatrix for UIkit
global.DOMMatrix = class DOMMatrix {
  m11 = 1; m12 = 0; m13 = 0; m14 = 0;
  m21 = 0; m22 = 1; m23 = 0; m24 = 0;
  m31 = 0; m32 = 0; m33 = 1; m34 = 0;
  m41 = 0; m42 = 0; m43 = 0; m44 = 1;
  constructor(arg?: string | unknown) {
    if (typeof arg === 'string' && arg.includes('matrix')) {
        const values = arg.match(/matrix\((.+)\)/)?.[1].split(',').map(Number);
        if (values && values.length === 6) {
            this.m11 = values[0]; this.m12 = values[1];
            this.m21 = values[2]; this.m22 = values[3];
            this.m41 = values[4]; this.m42 = values[5];
        }
    }
  }
  toString() { return `matrix(${this.m11}, ${this.m12}, ${this.m21}, ${this.m22}, ${this.m41}, ${this.m42})`; }
  multiply() { return this; }
  translate() { return this; }
  scale() { return this; }
  rotate() { return this; }
  inverse() { return this; }
} as unknown as typeof DOMMatrix;

vi.mock('./services/apiClient', () => ({
  apiClient: {
    getToken: vi.fn().mockReturnValue(null),
    setToken: vi.fn(),
    get: vi.fn().mockImplementation((url) => {
      if (url.startsWith('/session/init')) {
        return Promise.resolve({ accessToken: '', userProfile: null });
      }
      return Promise.resolve({});
    }),
  },
}));
