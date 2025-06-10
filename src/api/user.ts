// src/api/user.ts
import {apiRequest} from './index';
import {ApiResponse} from '../types';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  MobileFile,
  ResetPasswordCredentials,
  UpdateProfileData,
} from '../types/user/user';

// Función de login
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<ApiResponse<AuthResponse>> => {
  return await apiRequest<AuthResponse>(
    'post',
    '/api/v1/user/auth/login',
    credentials,
  );
};

// Función de Register
export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<ApiResponse<AuthResponse>> => {
  return await apiRequest<AuthResponse>(
    'post',
    '/api/v1/user/auth/register',
    credentials,
  );
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return await apiRequest<User>('get', '/api/v1/user/profile/me');
};

// Función para cerrrar sesión
export const logoutUser = async (): Promise<ApiResponse<{message: string}>> => {
  return await apiRequest<{message: string}>(
    'post',
    '/api/v1/user/auth/logout',
  );
};

// Función para verificar el correo electrónico
export const verifyEmail = async (
  id: string,
  hash: string,
): Promise<ApiResponse<{message: string}>> => {
  return await apiRequest<{message: string}>(
    'get',
    `/api/v1/user/auth/email/verify/${id}/${hash}`,
  );
};

// Función para solicitar un nuevo correo de verificación
export const requestEmailVerification = async (): Promise<
  ApiResponse<{message: string}>
> => {
  return await apiRequest<{message: string}>(
    'post',
    '/api/v1/user/auth/email/verification-notification',
  );
};

// Función para solicitar restablecimiento de contraseña
export const requestPasswordReset = async (
  email: string,
): Promise<ApiResponse<{message: string}>> => {
  return await apiRequest<{message: string}>(
    'post',
    '/api/v1/user/auth/forgot-password',
    {email},
  );
};

// Función para restablecer la contraseña
export const resetPassword = async (
  data: ResetPasswordCredentials,
): Promise<ApiResponse<{message: string}>> => {
  return await apiRequest<{message: string}>(
    'post',
    '/api/v1/user/auth/reset-password',
    data,
  );
};

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (
  profileData: UpdateProfileData,
): Promise<ApiResponse<User>> => {
  return await apiRequest<User>(
    'put',
    '/api/v1/user/profile/update',
    profileData,
  );
};

// ... otras funciones como logout, resetPassword, etc. ...

// !! ADAPTACIÓN MÓVIL !!
// Las funciones de subida de archivos deben adaptarse para manejar MobileFile.
export const uploadProfilePhoto = async (
  photoFile: MobileFile,
): Promise<ApiResponse<User>> => {
  const formData = new FormData();
  // La forma de adjuntar un archivo en React Native es diferente:
  formData.append('profile_photo_url', {
    uri: photoFile.uri,
    name: photoFile.name,
    type: photoFile.type,
  } as any);

  return await apiRequest<User>(
    'post',
    '/api/v1/user/profile/photo',
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
};

// ... función similar para uploadProfileVideo ...
