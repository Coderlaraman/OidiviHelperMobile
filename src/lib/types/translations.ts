import { en } from "@/translations/en";

// Tipos base para el sistema de traducciones
export type SupportedLanguages = "en" | "es" | "fr" | "pt";

// Tipo para representar una traducción completa
export type TranslationType = typeof en;

// Tipos auxiliares para el manejo de valores anidados
export type NestedValue = string | string[] | { [key: string]: NestedValue };
export type TranslationsRecord = Record<SupportedLanguages, TranslationType>;

// Tipo utilitario para generar las claves de traducción
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

// Tipo recursivo para obtener todas las rutas posibles en el objeto de traducción
export type RecursiveKeyOf<T> = T extends NestedValue
  ? T extends object
    ? {
        [K in keyof T]: K extends string | number
          ? `${K}` | Join<K, RecursiveKeyOf<T[K]>>
          : never;
      }[keyof T]
    : ""
  : never;

// Tipo final para las claves de traducción
export type TranslationKey = RecursiveKeyOf<TranslationType>;

// Interfaz para el contexto del proveedor de idiomas
export interface LanguageContextType {
  language: SupportedLanguages;
  setLanguage: (_lang: SupportedLanguages) => void;
  t: (_key: string, _params?: Record<string, string>) => string;
}
