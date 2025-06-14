// src/hooks/user/useUserAuth.ts

import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ADAPTACIÓN MÓVIL: Importación clave
import {useLanguage} from '../contexts/LanguageProvider';

// Importamos las funciones de la API y los tipos, que ya están definidos
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  requestPasswordReset,
  resetPassword as resetPasswordApi,
  requestEmailVerification,
} from '../lib/api/user'; // Asegúrate que la ruta es correcta
import {
  LoginCredentials,
  RegisterCredentials,
  User,
} from '../lib/types/user/user';

export const useUserAuth = () => {
  const {t} = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // El estado de isAuthenticated se deriva directamente de si 'user' existe.
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // No es necesario, podemos derivarlo
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Verificar si el usuario está autenticado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      // ADAPTACIÓN MÓVIL: Usamos AsyncStorage
      const token = await AsyncStorage.getItem('user_auth_token');
      if (token) {
        try {
          const response = await getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            await AsyncStorage.removeItem('user_auth_token');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          await AsyncStorage.removeItem('user_auth_token');
        } finally {
          setIsLoading(false);
          setIsInitialized(true);
        }
      } else {
        setIsInitialized(true);
      }
    };
    checkAuth();
  }, []);

  // Función para registrar un nuevo usuario
  const register = useCallback(
    async (userData: RegisterCredentials): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await registerUser(userData);
        if (response.success && response.data) {
          // ADAPTACIÓN MÓVIL: Usamos AsyncStorage
          await AsyncStorage.setItem('user_auth_token', response.data.token);
          setUser(response.data.user);
          return true; // Devolvemos éxito, la UI decidirá qué hacer
        } else {
          setError(response.message || t('error.registration_failed'));
          return false;
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : t('error.registration_failed'),
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  // Función para iniciar sesión
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await loginUser(credentials);
        if (response.success && response.data) {
          // ADAPTACIÓN MÓVIL: Usamos AsyncStorage
          await AsyncStorage.setItem('user_auth_token', response.data.token);
          setUser(response.data.user);
          // ADAPTACIÓN MÓVIL: ELIMINAMOS la navegación.
          // El hook solo informa del éxito.
          return true;
        } else {
          // Capturar mensajes específicos como cuenta deshabilitada
          const errorMsg = response.message || t('error.login_failed');

          // Verificar si el mensaje contiene información sobre cuenta deshabilitada
          const isDisabledAccount =
            errorMsg.toLowerCase().includes('deshabilitada') ||
            errorMsg.toLowerCase().includes('disabled');

          if (isDisabledAccount) {
            const formattedMsg = t('error.accountDisabled');
            console.warn('[Auth] Cuenta deshabilitada detectada');
            setError(formattedMsg);
          } else {
            console.warn('[Auth] Login failed with message:', errorMsg);
            setError(errorMsg);
          }

          return false;
        }
      } catch (e) {
        // Mejorar el mensaje de error para el usuario
        let errorMessage = t('error.login_failed');

        // Verificar si es un error con mensaje
        if (e instanceof Error) {
          // Verificar si el mensaje contiene información sobre cuenta deshabilitada
          if (
            e.message.toLowerCase().includes('deshabilitada') ||
            e.message.toLowerCase().includes('disabled')
          ) {
            errorMessage = t('error.accountDisabled');
            console.warn('[Auth] Cuenta deshabilitada detectada en error:', {
              name: e.name,
            });
          } else {
            errorMessage = e.message || errorMessage;
            console.error('[Auth] Login error:', {
              message: e.message,
              name: e.name,
            });
          }
        } else {
          console.error('[Auth] Login error (unknown type):', e);
        }

        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  // Función para cerrar sesión
  const logout = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Primero intentamos el logout en el servidor
      await logoutUser();
    } catch (e) {
      // Si falla, no importa, procedemos a limpiar el cliente
      console.error(
        'Server logout failed, proceeding with client-side cleanup:',
        e,
      );
    } finally {
      // ADAPTACIÓN MÓVIL: Limpiamos AsyncStorage
      await AsyncStorage.removeItem('user_auth_token');
      setUser(null);
      setIsLoading(false);
      // ADAPTACIÓN MÓVIL: ELIMINAMOS la navegación.
    }
    return true;
  }, []);

  // Las funciones restantes son idénticas en lógica porque solo manejan datos
  const requestPasswordResetEmail = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await requestPasswordReset(email);
        if (response.success) {
          return true;
        } else {
          setError(
            response.message || t('error.password_reset_request_failed'),
          );
          return false;
        }
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : t('error.password_reset_request_failed'),
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  const resetPassword = useCallback(
    async (
      email: string,
      token: string,
      password: string,
      password_confirmation: string,
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await resetPasswordApi({
          email,
          token,
          password,
          password_confirmation,
        });
        if (response.success) {
          return true;
        } else {
          setError(response.message || t('error.password_reset_failed'));
          return false;
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : t('error.password_reset_failed'),
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [t],
  );

  const resendVerificationEmail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await requestEmailVerification();
      if (response.success) {
        return true;
      } else {
        setError(response.message || t('error.resend_verification_failed'));
        return false;
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t('error.resend_verification_failed'),
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const refreshUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      } else {
        setError(response.message || t('error.refresh_user_data_failed'));
        return false;
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : t('error.refresh_user_data_failed'),
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user, // Derivamos el estado aquí para simplicidad
    isInitialized,
    error,
    register,
    login,
    logout,
    requestPasswordReset: requestPasswordResetEmail,
    resetPassword,
    resendVerificationEmail,
    refreshUserData,
  };
};
