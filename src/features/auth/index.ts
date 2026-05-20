// Components
export { LoginForm, RegisterForm, ProtectedRoute } from './components';

// Hooks
export { useAuth, useProtectedRoute } from './hooks';

// Services
export { authService } from './services';

// Schemas
export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from './schemas';
export type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ChangePasswordFormData,
} from './schemas';

// Types
export type { UserRole, AuthState, AuthContextValue, RegisterData, ProtectedRouteProps } from './types';
export { ROLE_HIERARCHY, hasPermission, canAccessRoute } from './types';

// Constants
export {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  MANAGER_ROUTES,
  AUTH_STORAGE_KEYS,
  AUTH_QUERY_KEYS,
  AUTH_ERRORS,
} from './constants';
