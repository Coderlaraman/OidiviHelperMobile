// src/api/user.ts
import {apiRequest} from './index';
import {ApiResponse} from '../../lib/types';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  ResetPasswordCredentials,
  UpdateProfileData,
} from '../../lib/types/user/user';
import {ReactNativeFile} from '../types/user/user';
import {PublicProfile} from '../../lib/types/user/publicProfile';
import {Review} from '../../lib/types/user/Review';

// CAMBIO: La firma de la función ahora usa nuestro tipo `ReactNativeFile`
export const uploadProfilePhoto = async (
  photoFile: ReactNativeFile,
): Promise<ApiResponse<User>> => {
  const formData = new FormData();

  // En React Native, se adjunta un objeto con uri, name y type
  formData.append('profile_photo_url', {
    uri: photoFile.uri,
    name: photoFile.name,
    type: photoFile.type,
  } as any); // El 'as any' a veces es necesario por discrepancias en los tipos de FormData

  return await apiRequest<User>(
    'post',
    '/api/v1/user/profile/photo',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// Adaptación para la subida de video
export const uploadProfileVideo = async (
  videoFile: ReactNativeFile,
): Promise<ApiResponse<User>> => {
  const formData = new FormData();

  formData.append('profile_video_url', {
    uri: videoFile.uri,
    name: videoFile.name,
    type: videoFile.type,
  } as any);

  return await apiRequest<User>(
    'post',
    '/api/v1/user/profile/video',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// Función para registrar un nuevo usuario
export const registerUser = async (
  userData: RegisterCredentials,
): Promise<ApiResponse<AuthResponse>> => {
  return await apiRequest<AuthResponse>(
    'post',
    '/api/v1/user/auth/register',
    userData,
  );
};

// Función para iniciar sesión
export const loginUser = async (
  credentials: LoginCredentials,
): Promise<ApiResponse<AuthResponse>> => {
  return await apiRequest<AuthResponse>(
    'post',
    '/api/v1/user/auth/login',
    credentials,
  );
};

// Función para obtener el usuario actual
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return await apiRequest<User>('get', '/api/v1/user/profile/me');
};

// Función para cerrar sesión
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

// Función para obtener el perfil público de un usuario
export const getPublicUserProfile = async (
  userId: string,
): Promise<ApiResponse<PublicProfile>> => {
  return await apiRequest<PublicProfile>(
    'get',
    `/api/v1/user/public/profiles/${userId}`,
  );
};

// Función para obtener las reseñas de un usuario
export const getUserReviews = async (
  userId: string,
): Promise<ApiResponse<Review[]>> => {
  return await apiRequest<Review[]>(
    'get',
    `/api/v1/user/reviews/reviews/${userId}`,
  );
};
