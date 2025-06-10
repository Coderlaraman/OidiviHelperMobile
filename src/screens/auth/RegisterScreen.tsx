// src/screens/auth/RegisterScreen.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold dark:text-white">
        Register Screen
      </Text>
    </SafeAreaView>
  );
}
