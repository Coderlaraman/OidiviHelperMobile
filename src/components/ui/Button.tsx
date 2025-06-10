// src/components/ui/Button.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

// NO hay ninguna importación de 'nativewind' aquí.

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  className?: string; // Permitimos pasar clases adicionales
  textClassName?: string; // Clases para el texto
}

export function Button({
  label,
  onPress,
  className,
  textClassName,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    // Aplicamos 'className' directamente al componente estándar
    <TouchableOpacity
      onPress={onPress}
      className={`
        py-3 px-6 rounded-lg items-center justify-center 
        flex-row gap-x-2
        shadow-lg
        transition-all
        active:opacity-80
        ${isDisabled ? 'bg-neutral-400 dark:bg-neutral-600' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}>
      {isLoading && <ActivityIndicator size="small" color="#FFFFFF" />}
      {/* Aplicamos 'className' directamente al componente de Texto */}
      <Text
        className={`
          text-white font-bold text-base 
          ${isDisabled ? 'text-neutral-200 dark:text-neutral-400' : ''}
          ${textClassName}
        `}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
