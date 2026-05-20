import { apiClient, type ApiResponse, type PaginatedResponse } from '../api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  unit: string;
  unitLabel: string;
  sku: string;
  barcode?: string;
  stock: number;
  minStock: number;
  isActive: boolean;
  isFeatured: boolean;
  isOrganic: boolean;
  images: ProductImage[];
  category: ProductCategory;
  brand?: ProductBrand;
  nutritionalInfo?: NutritionalInfo;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface NutritionalInfo {
  servingSize: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  fiber: number;
  sodium: number;
}

export interface ProductFilters {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  isOrganic?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  tags?: string[];
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface CreateProductRequest {
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  unitLabel: string;
  sku: string;
  barcode?: string;
  stock: number;
  minStock: number;
  categoryId: string;
  brandId?: string;
  isOrganic?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

export const productEndpoints = {
  list: (filters?: ProductFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/products', {
      params: filters,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Product>>(`/products/${id}`),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`),

  create: (data: CreateProductRequest) =>
    apiClient.post<ApiResponse<Product>>('/products', data),

  update: (id: string, data: UpdateProductRequest) =>
    apiClient.put<ApiResponse<Product>>(`/products/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/products/${id}`),

  uploadImage: (id: string, formData: FormData) =>
    apiClient.post<ApiResponse<ProductImage>>(`/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteImage: (productId: string, imageId: string) =>
    apiClient.delete<ApiResponse<null>>(`/products/${productId}/images/${imageId}`),

  getFeatured: (limit?: number) =>
    apiClient.get<ApiResponse<Product[]>>('/products/featured', {
      params: { limit },
    }),

  getByCategory: (categoryId: string, filters?: ProductFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      `/products/category/${categoryId}`,
      { params: filters }
    ),

  search: (query: string, filters?: ProductFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/products/search', {
      params: { q: query, ...filters },
    }),

  getCategories: () =>
    apiClient.get<ApiResponse<ProductCategory[]>>('/products/categories'),

  getBrands: () =>
    apiClient.get<ApiResponse<ProductBrand[]>>('/products/brands'),
};
