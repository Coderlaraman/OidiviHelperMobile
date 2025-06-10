// src/navigation/AppNavigator.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUserAuthContext} from '../contexts/UserAuthProvider';
import {View, ActivityIndicator} from 'react-native';

// Importación de nuestras pantallas
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

/**
 * Define los parámetros que cada pantalla puede recibir.
 * Esto proporciona autocompletado y seguridad de tipos.
 * 'undefined' significa que la pantalla no recibe parámetros.
 */
export type RootStackParamList = {
  // Grupo de Autenticación (Público)
  Home: undefined;
  Login: undefined;
  Register: undefined;

  // Grupo de Aplicación (Privado)
  Dashboard: undefined;
  Profile: {userId: string}; // Ejemplo de pantalla con parámetros
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- Stacks Separados para una Lógica Limpia ---

/**
 * Stack para usuarios NO autenticados.
 * Contiene la pantalla de inicio pública, login, registro, etc.
 */
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* Aquí irían otras pantallas públicas como Features, Pricing, About... */}
    </Stack.Navigator>
  );
}

/**
 * Stack para usuarios SÍ autenticados.
 * Contiene el dashboard principal y todas las pantallas privadas.
 */
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* Aquí irían otras pantallas como Messages, Settings, ServiceRequests... */}
    </Stack.Navigator>
  );
}

/**
 * El navegador raíz que decide qué Stack mostrar.
 */
export default function AppNavigator() {
  const {isAuthenticated, isInitialized} = useUserAuthContext();

  // Muestra una pantalla de carga mientras el contexto de autenticación
  // verifica si existe una sesión de usuario guardada.
  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#F9322C" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* Lógica condicional: Si está autenticado, muestra AppStack, si no, AuthStack */}
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
