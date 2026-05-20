'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './use-auth';
import { PUBLIC_ROUTES, AUTH_ROUTES, ADMIN_ROUTES } from '../constants';
import type { UserRole } from '../types';

interface UseProtectedRouteOptions {
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const {
    allowedRoles,
    redirectTo = AUTH_ROUTES.LOGIN,
    requireAuth = true,
  } = options;

  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname as typeof PUBLIC_ROUTES[number]);
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (isLoading) return;

    // If authentication is required and user is not authenticated
    if (requireAuth && !isAuthenticated && !isPublicRoute) {
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // If user is authenticated but trying to access auth pages (login, register, etc.)
    if (isAuthenticated && Object.values(AUTH_ROUTES).includes(pathname as typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES])) {
      router.push('/');
      return;
    }

    // If specific roles are required
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return;
    }

    // If trying to access admin routes without admin/manager role
    if (isAdminRoute && user && !['ADMIN', 'MANAGER'].includes(user.role)) {
      router.push('/unauthorized');
      return;
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    pathname,
    router,
    redirectTo,
    requireAuth,
    allowedRoles,
    isPublicRoute,
    isAdminRoute,
  ]);

  return {
    isLoading,
    isAuthenticated,
    user,
    isAuthorized:
      !requireAuth ||
      (isAuthenticated &&
        (!allowedRoles || (user && allowedRoles.includes(user.role)))),
  };
}
