// Admin authentication interfaces
export interface Admin {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: Admin;
}

export interface AdminAuthResponse {
  admin: Admin;
}
