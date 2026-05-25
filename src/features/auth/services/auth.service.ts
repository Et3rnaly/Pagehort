import {
  authEndpoints,
  type LoginRequest,
  type RegisterRequest,
  type User,
  type AuthResponse,
} from '@/src/services/endpoints';
import { setTokens, clearTokens } from '@/src/services/api';
import type { RegisterData } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const payload: LoginRequest = { email, password };
    const response = await authEndpoints.login(payload);
    const { tokens } = response.data.data;
    
    setTokens(tokens.accessToken, tokens.refreshToken);
    
    return response.data.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const payload: RegisterRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cpf: data.cpf,
    };
    
    const response = await authEndpoints.register(payload);
    const { tokens } = response.data.data;
    
    setTokens(tokens.accessToken, tokens.refreshToken);
    
    return response.data.data;
  },

  async logout(): Promise<void> {
    try {
      await authEndpoints.logout();
    } finally {
      clearTokens();
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await authEndpoints.forgotPassword({ email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await authEndpoints.resetPassword({
      token,
      password,
      confirmPassword: password,
    });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await authEndpoints.changePassword({
      currentPassword,
      newPassword,
      confirmPassword: newPassword,
    });
  },

  async getCurrentUser(): Promise<User> {
    const response = await authEndpoints.me();
    return response.data.data;
  },

  async validateSession(): Promise<boolean> {
    try {
      const response = await authEndpoints.validateSession();
      return response.data.data.valid;
    } catch {
      return false;
    }
  },

  async verifyEmail(token: string): Promise<void> {
    await authEndpoints.verifyEmail(token);
  },

  async resendVerification(): Promise<void> {
    await authEndpoints.resendVerification();
  },
};
