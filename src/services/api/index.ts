import { apiClient } from './client';
import {
  authRequestInterceptor,
  authResponseErrorInterceptor,
} from './auth.interceptor';
import {
  errorResponseInterceptor,
  successResponseInterceptor,
} from './error.interceptor';

// Request interceptors
apiClient.interceptors.request.use(authRequestInterceptor, (error) =>
  Promise.reject(error)
);

// Response interceptors
apiClient.interceptors.response.use(
  successResponseInterceptor,
  async (error) => {
    try {
      return await authResponseErrorInterceptor(error);
    } catch {
      return errorResponseInterceptor(error);
    }
  }
);

export { apiClient } from './client';
export type { ApiResponse, PaginatedResponse, ApiError, RequestConfig } from './client';
export { API_BASE_URL, API_TIMEOUT } from './client';
export {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './auth.interceptor';
export { parseApiError } from './error.interceptor';
