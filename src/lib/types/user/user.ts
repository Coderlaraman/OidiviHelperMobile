import type {
  Role,
  UserStats,
  Review,
  Report,
  ServiceRequest,
} from '@/lib/types';

// User Verification Status Type
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// Base User Interface
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  phone?: string;
  phone_verified_at?: string | null;
  address?: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  biography?: string;
  bio?: string;
  language?: string;
  timezone?: string;
  profile_photo_url?: string | null;
  profile_video_url?: string;
  professional_title?: string;
  company?: string;
  website?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
  skills?: {name: string}[];
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
  verification_status: 'verified' | 'unverified';
  roles: Role[];
  stats?: {
    completed_tasks: number;
    active_services: number;
    rating: number;
    satisfaction_rate: number;
    total_earnings: number;
  };
  preferences?: {
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
    profile_visibility: boolean;
    activity_visibility: boolean;
    location_visibility: boolean;
    high_contrast: boolean;
    large_text: boolean;
    screen_reader: boolean;
  };
  devices?: {
    id: string;
    name: string;
    last_access: string;
  }[];
  sessions?: {
    id: string;
    browser: string;
    location: string;
    last_access: string;
  }[];
}

// Auth Related Types
export interface LoginCredentials {
  email: string;
  password: string;
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

export interface AuthResponse {
  token: string;
  user: User;
}

// Password Reset Types
export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
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

// Profile Media Types
export interface ProfileMediaUpload {
  file: File;
  type: 'photo' | 'video';
}

// Verification Types
export interface VerificationDocumentUpload {
  file: File;
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
  reports_made: Report[];
  reports_received: Report[];
  service_requests: ServiceRequest[];
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

// Representa el objeto que típicamente recibes de una librería de selección de imágenes/archivos en React Native
export interface ReactNativeFile {
  uri: string;
  type: string; // e.g., 'image/jpeg'
  name: string; // e.g., 'profile.jpg'
}
