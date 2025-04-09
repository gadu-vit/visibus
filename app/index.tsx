import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, HankenGrotesk_400Regular, HankenGrotesk_700Bold } from '@expo-google-fonts/hanken-grotesk';

import MainRoutes from "@/src/routes/MainRoutes";
import { AuthProvider } from '../src/context/AuthContext';

// Impede que a splash desapareça antes da fonte carregar
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // pode mostrar um loader customizado aqui se quiser
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </View>
  );
}
