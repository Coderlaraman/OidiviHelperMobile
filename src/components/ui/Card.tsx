// src/components/ui/Card.tsx
import React from 'react';
import {View, ViewProps} from 'react-native';

// NO hay ninguna importación de 'nativewind' aquí.

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({children, className, ...props}: CardProps) {
  return (
    // Aplicamos 'className' directamente a la View estándar
    <View
      className={`
        bg-white dark:bg-neutral-800 
        border border-neutral-200 dark:border-neutral-700 
        rounded-xl shadow-lg
        ${className}
      `}
      {...props}>
      {children}
    </View>
  );
}
