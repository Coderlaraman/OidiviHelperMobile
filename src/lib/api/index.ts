// @/lib/api/index.ts

import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage
import {API_BASE_URL} from '@env'; // Importamos desde react-native-dotenv
import {ApiErrorResponse, ApiResponse, User} from '../types';

// La URL base ahora viene de @env
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// El interceptor de request es ASÍNCRONO
api.interceptors.request.use(async config => {
  // `getItem` devuelve una promesa
  const token = await AsyncStorage.getItem('user_auth_token');

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// El interceptor de respuesta no maneja la navegación
api.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Solo eliminamos el token. La UI reaccionará a la falta de autenticación.
        console.warn(
          '[API Interceptor] Error 401: Token inválido o expirado. Limpiando token.',
        );
        AsyncStorage.removeItem('user_auth_token');
      }

      // El manejo del 403 puede ser útil para logs, pero la UI debería mostrar el mensaje.
      if (status === 403) {
        console.warn('[API Interceptor] Error 403: Acceso prohibido.');
      }
    }

    // Siempre rechazamos la promesa para que el error pueda ser capturado por el 'catch' de la llamada original.
    return Promise.reject(error);
  },
);

// Función genérica para realizar peticiones HTTP
export const apiRequest = async <T>(
  method: string,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    // Configurar timeout para detectar archivos grandes más rápido
    const requestConfig = {
      ...config,
      timeout: config?.timeout || 30000, // 30 segundos por defecto
    };

    let response: AxiosResponse;

    switch (method.toLowerCase()) {
      case 'get':
        response = await api.get(url, requestConfig);
        break;
      case 'post':
        response = await api.post(url, data, requestConfig);
        break;
      case 'put':
        response = await api.put(url, data, requestConfig);
        break;
      case 'patch':
        response = await api.patch(url, data, requestConfig);
        break;
      case 'delete':
        response = await api.delete(url, requestConfig);
        break;
      default:
        throw new Error(`HTTP method not supported: ${method}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Si hay una respuesta del servidor con errores de validación
      if (error.response) {
        // Detectar específicamente errores de validación de archivos grandes
        if (
          error.response.status === 413 ||
          (error.response.data?.errors &&
            error.response.data.errors.file &&
            error.response.data.errors.file.includes('The file is too large'))
        ) {
          return {
            status: 'error',
            success: false,
            message: 'This file is too large.',
            data: {} as T,
            errors: {
              file: ['This file is too large.'],
            },
          } as ApiResponse<T>;
        }

        // Devolver la respuesta de error del servidor
        return error.response.data as ApiResponse<T>;
      }

      // Detectar errores de timeout o conexión abortada (posiblemente por archivo grande)
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return {
          status: 'error',
          success: false,
          message: 'The request is taking too long. Please try again later.',
          data: {} as T,
          errors: {
            file: ['The file is too large.'],
          },
        } as ApiResponse<T>;
      }
    }

    // Error genérico de conexión
    return {
      success: false,
      message:
        'There was a problem connecting to the server. Please try again later.',
      data: {} as T,
    };
  }
};

// Tipos para la búsqueda
interface SearchParams {
  query?: string;
  category?: string;
  rating?: string;
  price?: string;
}

// Función para buscar usuarios
export const searchUsers = async (params: SearchParams) => {
  const queryString = new URLSearchParams();

  if (params.query) queryString.append('query', params.query);
  if (params.category) queryString.append('category', params.category);
  if (params.rating) queryString.append('rating', params.rating);
  if (params.price) queryString.append('price', params.price);

  return apiRequest<User[]>(
    'get',
    `/api/users/search?${queryString.toString()}`,
  );
};

export default api;
