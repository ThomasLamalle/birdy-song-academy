
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7b01af8b405242eaadb9933a754762a5',
  appName: 'birdy-song-academy',
  webDir: 'dist',
  server: {
    url: "https://7b01af8b-4052-42ea-adb9-933a754762a5.lovableproject.com?forceHideBadge=true",
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
