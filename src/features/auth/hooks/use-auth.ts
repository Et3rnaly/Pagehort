'use client';

import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services';
import { AUTH_QUERY_KEYS, AUTH_ROUTES, PROTECTED_ROUTES } from '../constants';
import type { RegisterData } from '../types';
import type { User } from '@/src/services/endpoints';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    error,
    refetch: refreshUser,
  } = useQuery<User | null>({
    queryKey: AUTH_QUERY_KEYS.USER,
    queryFn: async () => {
      try {
        return await authService.getCurrentUser();
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.USER, data.user);
      router.push(PROTECTED_ROUTES.DASHBOARD);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.USER, data.user);
      router.push(PROTECTED_ROUTES.DASHBOARD);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.USER, null);
      queryClient.clear();
      router.push(AUTH_ROUTES.LOGIN);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
    onSuccess: () => {
      router.push(AUTH_ROUTES.LOGIN);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => authService.changePassword(currentPassword, newPassword),
  });

  const login = useCallback(
    async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password });
    },
    [loginMutation]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      await registerMutation.mutateAsync(data);
    },
    [registerMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const forgotPassword = useCallback(
    async (email: string) => {
      await forgotPasswordMutation.mutateAsync(email);
    },
    [forgotPasswordMutation]
  );

  const resetPassword = useCallback(
    async (token: string, password: string) => {
      await resetPasswordMutation.mutateAsync({ token, password });
    },
    [resetPasswordMutation]
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      await changePasswordMutation.mutateAsync({ currentPassword, newPassword });
    },
    [changePasswordMutation]
  );

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error: error?.message || null,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshUser,
    loginMutation,
    registerMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    changePasswordMutation,
  };
}
