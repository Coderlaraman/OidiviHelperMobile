// src/navigation/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUserAuthContext} from '@/contexts/UserAuthContext'; // Asegúrate de la ruta

// Importa tus pantallas (las crearemos a continuación)
import SplashScreen from '@/screens/SplashScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

// Define el tipo para las pantallas para tener autocompletado y seguridad de tipos
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  Dashboard: undefined;
  Profile: {userId: number};
  // ... otras pantallas de tu app
};

const Stack = createNativeStackNavigator();

// Stack para cuando el usuario NO está autenticado
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* Podrías añadir la pantalla de ForgotPassword aquí */}
    </Stack.Navigator>
  );
};

// Stack para cuando el usuario SÍ está autenticado
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* Aquí irían las demás pantallas de la app */}
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const {isAuthenticated, isInitialized} = useUserAuthContext();

  // Mientras se verifica el token, mostramos una pantalla de carga.
  // Esto previene un "parpadeo" donde se muestra la pantalla de login por un instante.
  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
