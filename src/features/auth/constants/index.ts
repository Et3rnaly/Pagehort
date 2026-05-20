export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
} as const;

export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ADMIN: '/admin',
} as const;

export const PUBLIC_ROUTES = [
  '/',
  '/products',
  '/categories',
  '/about',
  '/contact',
  AUTH_ROUTES.LOGIN,
  AUTH_ROUTES.REGISTER,
  AUTH_ROUTES.FORGOT_PASSWORD,
  AUTH_ROUTES.RESET_PASSWORD,
  AUTH_ROUTES.VERIFY_EMAIL,
] as const;

export const ADMIN_ROUTES = [
  PROTECTED_ROUTES.ADMIN,
  '/admin/products',
  '/admin/orders',
  '/admin/users',
  '/admin/reports',
] as const;

export const MANAGER_ROUTES = [
  ...ADMIN_ROUTES,
] as const;

export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

export const AUTH_QUERY_KEYS = {
  USER: ['auth', 'user'] as const,
  SESSION: ['auth', 'session'] as const,
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  USER_NOT_FOUND: 'Usuário não encontrado',
  EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado',
  SESSION_EXPIRED: 'Sua sessão expirou. Faça login novamente.',
  UNAUTHORIZED: 'Você não tem permissão para acessar esta página',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
} as const;
