// src/types/translations.ts

// NOTA: Para que TranslationType funcione, necesitas tener tus archivos
// de traducción (en.ts, es.ts) en src/translations/
// import { en } from '@/translations/en';

// Por ahora, lo definimos de forma más genérica para evitar un error de importación.
export type TranslationType = {[key: string]: any};

export type SupportedLanguages = 'en' | 'es' | 'fr' | 'pt';
export type NestedValue = string | string[] | {[key: string]: NestedValue};
export type TranslationsRecord = Record<SupportedLanguages, TranslationType>;

// ... (El resto de tus tipos utilitarios como Join, RecursiveKeyOf, etc. son idénticos)

export interface LanguageContextType {
  language: SupportedLanguages;
  setLanguage: (_lang: SupportedLanguages) => void;
  t: (_key: string, _params?: Record<string, string>) => string;
}
