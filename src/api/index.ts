// src/api/index.ts
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiErrorResponse, ApiResponse} from '../types/';

const API_BASE_URL = 'http://oidivi-helper-api.test'; // Reemplaza con tu URL de API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  timeout: 30000, // 30 segundos de timeout por defecto
});

// Interceptor para AÑADIR el token
api.interceptors.request.use(async config => {
  // ADAPTACIÓN: Usamos AsyncStorage en lugar de localStorage
  const token = await AsyncStorage.getItem('user_auth_token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para MANEJAR errores
api.interceptors.response.use(
  response => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      // ADAPTACIÓN: Limpiamos el token pero no podemos redirigir con window.location
      await AsyncStorage.removeItem('user_auth_token');
      // La lógica de redirección debe vivir en la UI, por ejemplo, en el hook `useUserAuth`
      // o a través de un sistema de eventos.
      console.log('Token inválido o expirado. Sesión cerrada.');
    }
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

export default api;
