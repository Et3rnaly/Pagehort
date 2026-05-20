import { apiClient, type ApiResponse, type PaginatedResponse } from '../api';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
}

export interface OrderAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  deliveryAddress: OrderAddress;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryAddress: OrderAddress;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  paymentMethod: string;
  couponCode?: string;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
}

export const orderEndpoints = {
  list: (filters?: OrderFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/orders', {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Order>>(`/orders/${id}`),

  getByOrderNumber: (orderNumber: string) =>
    apiClient.get<ApiResponse<Order>>(`/orders/number/${orderNumber}`),

  create: (data: CreateOrderRequest) =>
    apiClient.post<ApiResponse<Order>>('/orders', data),

  updateStatus: (id: string, data: UpdateOrderStatusRequest) =>
    apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, data),

  cancel: (id: string, reason?: string) =>
    apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`, { reason }),

  getMyOrders: (filters?: OrderFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/orders/my', {
      params: filters,
    }),

  getOrderHistory: (userId: string, filters?: OrderFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Order>>>(`/orders/user/${userId}`, {
      params: filters,
    }),

  calculateDeliveryFee: (zipCode: string) =>
    apiClient.get<ApiResponse<{ fee: number; estimatedDays: number }>>(
      '/orders/delivery-fee',
      { params: { zipCode } }
    ),

  applyCoupon: (code: string, subtotal: number) =>
    apiClient.post<ApiResponse<{ discount: number; message: string }>>(
      '/orders/apply-coupon',
      { code, subtotal }
    ),

  getTimeSlots: (date: string, zipCode: string) =>
    apiClient.get<ApiResponse<string[]>>('/orders/time-slots', {
      params: { date, zipCode },
    }),
};
