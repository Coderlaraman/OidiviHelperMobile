// src/components/navigation/PublicNavbar.tsx
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../contexts/ThemeProvider';
import {Sun, Moon, Languages, Menu} from 'lucide-react-native';

export function PublicNavbar() {
  const navigation = useNavigation();
  const {theme, setTheme} = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <View className="flex-row items-center justify-between h-16 px-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      {/* Logo */}
      <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
        {theme === 'dark' ? (
          <Image
            source={require('@/assets/images/logo-dark.png')}
            className="h-10 w-32"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('@/assets/images/logo-light.png')}
            className="h-10 w-32"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      {/* Acciones */}
      <View className="flex-row items-center gap-x-2">
        <TouchableOpacity
          onPress={() => {
            /* Lógica cambio idioma */
          }}
          className="p-2">
          <Languages className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} className="p-2">
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          ) : (
            <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            /* Lógica para abrir menú lateral */
          }}
          className="p-2">
          <Menu className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
