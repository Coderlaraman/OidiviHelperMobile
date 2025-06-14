// @/contexts/UserAuthContext.tsx

// ¡SIN CAMBIOS! ESTE CÓDIGO ES PERFECTAMENTE REUTILIZABLE.
// Demuestra el poder de una buena separación de responsabilidades.

import React, {createContext, useContext, ReactNode} from 'react';
import {useLanguage} from '@/contexts/LanguageProvider';
import {useUserAuth} from '@/hooks/useUserAuth';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
} from '@/lib/types/user/user';

// La interfaz del contexto no cambia
interface UserAuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error: string | null;
  register: (_userData: RegisterCredentials) => Promise<boolean>;
  login: (_credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
  requestPasswordReset: (_email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    token: string,
    password: string,
    password_confirmation: string,
  ) => Promise<boolean>;
  resendVerificationEmail: () => Promise<boolean>;
  refreshUserData: () => Promise<boolean>;
}

// La creación del contexto no cambia
const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

// El proveedor no cambia: simplemente consume el hook adaptado `useUserAuth`
export const UserAuthProvider = ({children}: {children: ReactNode}) => {
  const auth = useUserAuth();

  return (
    <UserAuthContext.Provider value={auth}>{children}</UserAuthContext.Provider>
  );
};

// El hook para consumir el contexto no cambia
export const useUserAuthContext = () => {
  const {t} = useLanguage();
  const context = useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error(t('error.auth_context_missing'));
  }

  return context;
};
