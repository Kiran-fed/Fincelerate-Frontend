import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from '@expo-google-fonts/poppins';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-100': Montserrat_100Thin,
    'Montserrat-200': Montserrat_200ExtraLight,
    'Montserrat-300': Montserrat_300Light,
    'Montserrat-400': Montserrat_400Regular,
    'Montserrat-500': Montserrat_500Medium,
    'Montserrat-600': Montserrat_600SemiBold,
    'Montserrat-700': Montserrat_700Bold,
    'Montserrat-800': Montserrat_800ExtraBold,
    'Montserrat-900': Montserrat_900Black,

    'Poppins-100': Poppins_100Thin,
    'Poppins-200': Poppins_200ExtraLight,
    'Poppins-300': Poppins_300Light,
    'Poppins-400': Poppins_400Regular,
    'Poppins-500': Poppins_500Medium,
    'Poppins-600': Poppins_600SemiBold,
    'Poppins-700': Poppins_700Bold,
    'Poppins-800': Poppins_800ExtraBold,
    'Poppins-900': Poppins_900Black,
  });

  // Configure Google Sign-In for mobile (iOS + Android)
  useEffect(() => {
    if (Platform.OS !== 'web') {
      GoogleSignin.configure({
        webClientId: '767707810801-chqoaj1nnite0pbk08v9h8geimopamhb.apps.googleusercontent.com',
        offlineAccess: true,
      });
    }
  }, []);

  // Hide splash screen when fonts load
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const content = (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );

  // Wrap web platform with GoogleOAuthProvider
  if (Platform.OS === 'web') {
    return (
      <GoogleOAuthProvider clientId="767707810801-chqoaj1nnite0pbk08v9h8geimopamhb.apps.googleusercontent.com">
        {content}
      </GoogleOAuthProvider>
    );
  }

  return content;
}

   