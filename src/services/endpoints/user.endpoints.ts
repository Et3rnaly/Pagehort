import { apiClient, type ApiResponse, type PaginatedResponse } from '../api';
import type { User } from './auth.endpoints';

export interface UserAddress {
  id: string;
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
  isDefault: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  cpf?: string;
}

export interface UserFilters {
  role?: User['role'];
  search?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface CreateAddressRequest {
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
  isDefault?: boolean;
}

export const userEndpoints = {
  // User management (admin)
  list: (filters?: UserFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<User>>(`/users/${id}`),

  update: (id: string, data: UpdateUserRequest) =>
    apiClient.put<ApiResponse<User>>(`/users/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/users/${id}`),

  updateRole: (id: string, role: User['role']) =>
    apiClient.patch<ApiResponse<User>>(`/users/${id}/role`, { role }),

  toggleActive: (id: string) =>
    apiClient.patch<ApiResponse<User>>(`/users/${id}/toggle-active`),

  // Current user profile
  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/users/profile'),

  updateProfile: (data: UpdateUserRequest) =>
    apiClient.put<ApiResponse<User>>('/users/profile', data),

  uploadAvatar: (formData: FormData) =>
    apiClient.post<ApiResponse<{ url: string }>>('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteAvatar: () =>
    apiClient.delete<ApiResponse<null>>('/users/profile/avatar'),

  // Addresses
  getAddresses: () =>
    apiClient.get<ApiResponse<UserAddress[]>>('/users/addresses'),

  addAddress: (data: CreateAddressRequest) =>
    apiClient.post<ApiResponse<UserAddress>>('/users/addresses', data),

  updateAddress: (id: string, data: Partial<CreateAddressRequest>) =>
    apiClient.put<ApiResponse<UserAddress>>(`/users/addresses/${id}`, data),

  deleteAddress: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/users/addresses/${id}`),

  setDefaultAddress: (id: string) =>
    apiClient.patch<ApiResponse<UserAddress>>(`/users/addresses/${id}/default`),

  // Address lookup
  lookupZipCode: (zipCode: string) =>
    apiClient.get<ApiResponse<Partial<UserAddress>>>(`/users/addresses/lookup/${zipCode}`),
};
