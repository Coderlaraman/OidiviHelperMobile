// src/contexts/ThemeProvider.tsx
import React, {createContext, useContext, ReactNode} from 'react';
import {useColorScheme} from 'nativewind';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string; // Mantenemos props para compatibilidad conceptual
  defaultTheme?: 'system' | 'light' | 'dark';
  enableSystem?: boolean;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: ThemeProviderProps) {
  const {colorScheme, setColorScheme} = useColorScheme();

  const value = {
    theme: colorScheme ?? 'light',
    setTheme: setColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
