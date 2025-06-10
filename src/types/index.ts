// src/types/index.ts
// import {Category} from './user/category';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
}

// NOTA: El tipo 'File' del navegador no existe en React Native.
// Lo definiremos más adelante para la subida de archivos.
export interface FileUploadError extends ApiErrorResponse {
  code?: string;
  type?: 'file_size' | 'file_type' | 'upload_failed' | 'network_error';
}

// Permission Types
export interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Role Types
export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
  created_at: string;
  updated_at: string;
}

// Skill Types
export interface Skill {
  id: number;
  name: string;
  description: string;
  //   categories: Category[];
  created_at: string;
  updated_at: string;
}

// User Stats Types
export interface UserStats {
  id: number;
  user_id: number;
  completed_tasks: number;
  active_services: number;
  total_earnings: number;
  rating: number;
  satisfaction_rate: number;
  created_at: string;
  updated_at: string;
}

// Verification Document Type
export interface VerificationDocument {
  url: string;
  type: string;
  uploaded_at: string;
}

// Review Types
export interface Review {
  id: number;
  reviewer_id: number;
  reviewed_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

// Report Types
export interface Report {
  id: number;
  reported_by: number;
  reported_user: number;
  reason: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// export * from './user/location';
// export * from './user/serviceRequest';
// export * from './user/user';
export * from './translations';
