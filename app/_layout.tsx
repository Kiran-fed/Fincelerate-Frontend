
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
// import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useFrameworkReady();

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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
       <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
    </Stack>
      <StatusBar style="auto" />
    </>
  );
}
