// src/contexts/Providers.tsx

import React, {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// --- Crearemos estos providers a continuación ---
// import { UserAuthProvider } from "./UserAuthContext";
// import { NotificationProvider } from "./NotificationContext";
import {ThemeProvider} from './ThemeProvider';
import {LanguageProvider} from './LanguageProvider';

// Es una buena práctica crear un componente para agrupar todos los providers
export function Providers({children}: {children: ReactNode}) {
  // La configuración de React Query es idéntica a la web
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            gcTime: 1000 * 60 * 30, // 30 minutos
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserAuthProvider> */}
      {/* <NotificationProvider> */}
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
      {/* </NotificationProvider> */}
      {/* </UserAuthProvider> */}
    </QueryClientProvider>
  );
}
