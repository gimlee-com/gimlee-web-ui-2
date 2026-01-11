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
      backgroundColor: '#ffffff',
    },
  },
};

export default config;
