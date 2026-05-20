import { apiClient, type ApiResponse } from '../api';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BOLETO';

export interface PaymentCard {
  id: string;
  brand: string;
  lastFourDigits: string;
  holderName: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface CreatePaymentRequest {
  orderId: string;
  method: PaymentMethod;
  cardId?: string;
  installments?: number;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: 'PENDING' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';
  amount: number;
  installments?: number;
  pixCode?: string;
  pixQrCode?: string;
  boletoUrl?: string;
  boletoCode?: string;
  expiresAt?: string;
  paidAt?: string;
  createdAt: string;
}

export interface AddCardRequest {
  number: string;
  holderName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  isDefault?: boolean;
}

export interface RefundRequest {
  paymentId: string;
  amount?: number;
  reason: string;
}

export const paymentEndpoints = {
  process: (data: CreatePaymentRequest) =>
    apiClient.post<ApiResponse<PaymentResponse>>('/payments/process', data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<PaymentResponse>>(`/payments/${id}`),

  getByOrderId: (orderId: string) =>
    apiClient.get<ApiResponse<PaymentResponse>>(`/payments/order/${orderId}`),

  checkStatus: (id: string) =>
    apiClient.get<ApiResponse<{ status: PaymentResponse['status'] }>>(
      `/payments/${id}/status`
    ),

  refund: (data: RefundRequest) =>
    apiClient.post<ApiResponse<PaymentResponse>>('/payments/refund', data),

  // Saved cards
  getCards: () =>
    apiClient.get<ApiResponse<PaymentCard[]>>('/payments/cards'),

  addCard: (data: AddCardRequest) =>
    apiClient.post<ApiResponse<PaymentCard>>('/payments/cards', data),

  deleteCard: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/payments/cards/${id}`),

  setDefaultCard: (id: string) =>
    apiClient.patch<ApiResponse<PaymentCard>>(`/payments/cards/${id}/default`),

  // Installments
  getInstallments: (amount: number, cardBrand?: string) =>
    apiClient.get<ApiResponse<Array<{ number: number; value: number; total: number }>>>(
      '/payments/installments',
      { params: { amount, cardBrand } }
    ),
};
