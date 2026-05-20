import { apiClient, type ApiResponse } from '../api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpf?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  role: 'ADMIN' | 'MANAGER' | 'CUSTOMER';
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export const authEndpoints = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),

  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),

  refreshToken: (data: RefreshTokenRequest) =>
    apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post<ApiResponse<null>>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<ApiResponse<null>>('/auth/reset-password', data),

  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post<ApiResponse<null>>('/auth/change-password', data),

  verifyEmail: (token: string) =>
    apiClient.post<ApiResponse<null>>('/auth/verify-email', { token }),

  resendVerification: () =>
    apiClient.post<ApiResponse<null>>('/auth/resend-verification'),

  me: () => apiClient.get<ApiResponse<User>>('/auth/me'),

  validateSession: () =>
    apiClient.get<ApiResponse<{ valid: boolean }>>('/auth/validate'),
};
