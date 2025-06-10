// src/contexts/UserAuthProvider.tsx

import React, {createContext, useContext, ReactNode} from 'react';
import {useLanguage} from './LanguageProvider';
import {useUserAuth} from '../hooks/useUserAuth';

// El tipo para nuestro contexto. Usamos ReturnType para inferirlo automáticamente
// desde el hook, asegurando que siempre estén sincronizados.
type UserAuthContextType = ReturnType<typeof useUserAuth>;

// Creamos el contexto
const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

// El componente Proveedor
export const UserAuthProvider = ({children}: {children: ReactNode}) => {
  const auth = useUserAuth();

  return (
    <UserAuthContext.Provider value={auth}>{children}</UserAuthContext.Provider>
  );
};

// El hook para consumir el contexto desde los componentes
export const useUserAuthContext = () => {
  const {t} = useLanguage();
  const context = useContext(UserAuthContext);

  if (context === undefined) {
    throw new Error(
      t('error.auth_context_missing') ||
        'useUserAuthContext must be used within a UserAuthProvider',
    );
  }

  return context;
};
