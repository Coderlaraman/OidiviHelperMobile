// src/types/user/user.ts
import type {Role, UserStats, Review} from '../../types';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// Aquí copiamos y pegamos la interfaz 'User' completa desde tu archivo web.
// Es 100% compatible.
export interface User {
  id: number;
  name: string;
  email: string;
  // ... todas las demás propiedades
  verification_status: 'verified' | 'unverified';
  roles: Role[];
}

// Tipos de autenticación (idénticos)
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  // ... resto de campos
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ... (ResetPasswordCredentials, UpdateProfileData, etc., son idénticos)

// !! ADAPTACIÓN MÓVIL !!
// En React Native, un archivo no es un objeto 'File'. Suele ser un objeto
// con una URI. Definimos un tipo para representar esto.
export interface MobileFile {
  uri: string;
  name: string;
  type: string; // e.g., 'image/jpeg'
}

export interface ProfileMediaUpload {
  file: MobileFile;
  type: 'photo' | 'video';
}

export interface VerificationDocumentUpload {
  file: MobileFile;
  type: string;
}

// User Dashboard Types
export interface UserDashboard {
  user: User;
  stats: UserStats;
  service_requests: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
}

export interface ResetPasswordCredentials {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  accepted_terms: boolean;
  phone: string;
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

// Profile Update Types
export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  biography?: string;
  preferred_language?: string;
  professional_title?: string;
  company?: string;
  website?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: string[];
  experience_years?: number;
  education?: {
    institution: string;
    degree: string;
    field: string;
    year: number;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: number;
    url?: string;
  }[];
  languages_spoken?: {
    language: string;
    proficiency: 'basic' | 'intermediate' | 'advanced' | 'native';
  }[];
  availability_hours?: {
    day: string;
    start_time: string;
    end_time: string;
  }[];
}

// Search Types
export interface UserSearchParams {
  query?: string;
  skills?: number[];
  categories?: number[];
  verification_status?: VerificationStatus;
  role?: string;
}

// User Relations Types
export interface UserRelations {
  reviews_given: Review[];
  reviews_received: Review[];
}

export interface RoleManagement {
  // Role Methods
  hasRole: (_role: string) => boolean;
  hasAnyRole: (_roles: string[]) => boolean;
  hasAllRoles: (_roles: string[]) => boolean;
  assignRole: (_role: string) => void;
  removeRole: (_role: string) => void;
  syncRolesByName: (_roleNames: string[]) => void;
  setMainRole: (_roleName: string) => Promise<void>;

  // Permission Methods
  permissions: () => string[];
  hasPermission: (_permission: string) => boolean;
  hasAnyPermission: (_permissions: string[]) => boolean;
  hasAllPermissions: (_permissions: string[]) => boolean;
}

export interface UserFilters {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  role?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  sort_direction?: 'asc' | 'desc'; // for backward compatibility
  show_deleted?: boolean;
  with_profile?: boolean;
}

export interface UserMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role_id?: number;
}

export interface RestoreUserOptions {
  id: number;
}

export type UserStatus = 'active' | 'inactive' | 'suspended';
