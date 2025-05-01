
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.birdysongacademy',
  appName: 'birdy-song-academy',
  webDir: 'dist',
  server: {
    androidScheme: "https",
    cleartext: true
  },
  android: {
    navigationBarColor: '#2D6A4F'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#F5F0E1",
      showSpinner: true,
      spinnerColor: "#2D6A4F"
    }
  }
};

export default config;
