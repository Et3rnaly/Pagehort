import type { AxiosError, AxiosResponse } from 'axios';
import type { ApiError } from './client';

export interface ErrorResponse {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
  timestamp: string;
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Requisição inválida. Verifique os dados enviados.',
  401: 'Sessão expirada. Faça login novamente.',
  403: 'Você não tem permissão para acessar este recurso.',
  404: 'Recurso não encontrado.',
  409: 'Conflito. O recurso já existe.',
  422: 'Dados inválidos. Verifique os campos informados.',
  429: 'Muitas requisições. Aguarde um momento.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
  502: 'Serviço temporariamente indisponível.',
  503: 'Serviço em manutenção. Tente novamente mais tarde.',
};

export const parseApiError = (error: AxiosError<ErrorResponse>): ApiError => {
  if (error.response) {
    const { status, data } = error.response;
    
    return {
      message: data?.message || ERROR_MESSAGES[status] || 'Erro desconhecido.',
      code: data?.code || `ERROR_${status}`,
      status,
      details: data?.details,
      timestamp: data?.timestamp || new Date().toISOString(),
    };
  }
  
  if (error.request) {
    return {
      message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
      code: 'NETWORK_ERROR',
      status: 0,
      timestamp: new Date().toISOString(),
    };
  }
  
  return {
    message: error.message || 'Erro desconhecido.',
    code: 'UNKNOWN_ERROR',
    status: 0,
    timestamp: new Date().toISOString(),
  };
};

export const errorResponseInterceptor = (
  error: AxiosError<ErrorResponse>
): Promise<never> => {
  const apiError = parseApiError(error);
  
  // Log error for monitoring (in production, send to error tracking service)
  if (process.env.NODE_ENV === 'development') {
    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: apiError.status,
      message: apiError.message,
      code: apiError.code,
    });
  }
  
  return Promise.reject(apiError);
};

export const successResponseInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};
