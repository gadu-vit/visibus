// App.tsx ou Routes.tsx
import React from 'react';
import { NavigationIndependentTree } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';

import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const Stack = createNativeStackNavigator();

export default function MainRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationIndependentTree>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomePage} />
        ) : (
          <Stack.Screen name="Login" component={LoginPage} />
        )}
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}
