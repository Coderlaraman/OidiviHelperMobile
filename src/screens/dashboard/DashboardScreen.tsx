// src/screens/dashboard/DashboardScreen.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserAuthContext} from '../../contexts/UserAuthProvider';
import {Button} from '../../components/ui/Button';

export default function DashboardScreen() {
  const {user, logout} = useUserAuthContext();

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4 dark:text-white">Dashboard</Text>
      <Text className="text-lg mb-8 dark:text-gray-300">
        Welcome, {user?.name}!
      </Text>
      <Button label="Logout" onPress={logout} className="bg-red-600 w-full" />
    </SafeAreaView>
  );
}
