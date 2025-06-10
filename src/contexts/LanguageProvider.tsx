// src/contexts/LanguageProvider.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';
import {en} from '../translations//en';
import {es} from '../translations/es';
// import { fr } from "@/translations/fr"; // Descomenta cuando los tengas
// import { pt } from "@/translations/pt"; // Descomenta cuando los tengas
import {
  LanguageContextType,
  SupportedLanguages,
  TranslationType,
  NestedValue,
} from '../types/translations';

const translations: Record<string, TranslationType> = {en, es};

function getTranslationValue(
  obj: NestedValue,
  path: string[],
): string | undefined {
  return path.reduce<NestedValue | undefined>(
    (acc, key) =>
      acc &&
      typeof acc === 'object' &&
      key in (acc as Record<string, NestedValue>)
        ? (acc as Record<string, NestedValue>)[key]
        : undefined,
    obj,
  ) as string | undefined;
}

function interpolate(text: string, params?: Record<string, string>): string {
  if (!params) return text;
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    return params[key.trim()] !== undefined ? params[key.trim()] : `{{${key}}}`;
  });
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: key => key,
});

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguage] = useState<SupportedLanguages>('es');

  const t = (key: string, params?: Record<string, string>): string => {
    try {
      const keys = key.split('.');
      const translation = translations[language];
      const value = getTranslationValue(translation, keys);

      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in ${language}`);
        return key;
      }
      return params ? interpolate(value, params) : value;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  const value: LanguageContextType = {language, setLanguage, t};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
