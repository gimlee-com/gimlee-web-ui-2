import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gimlee.app',
  appName: 'Gimlee',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    hostname: 'gimlee.com'
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#121415',
      style: 'DARK',
      overlaysWebView: false,
    },
  },
};

export default config;
