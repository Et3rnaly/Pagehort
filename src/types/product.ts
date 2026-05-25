export type ProductRow = {
  id: string
  name: string
  slug: string | null
  category: string
  description: string | null
  image_url: string | null
  price: number
  old_price: number | null
  unit_label: string
  unit_info: string | null
  discount_label: string | null
  featured: boolean
  available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type ProductInsert = {
  id?: string
  name: string
  slug?: string | null
  category: string
  description?: string | null
  image_url?: string | null
  price: number
  old_price?: number | null
  unit_label: string
  unit_info?: string | null
  discount_label?: string | null
  featured?: boolean
  available?: boolean
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export type ProductUpdate = Partial<ProductInsert>

export type AdminUserRow = {
  user_id: string
  role: "owner" | "admin"
  active: boolean
  created_at: string
}

export type AdminUserInsert = {
  user_id: string
  role: "owner" | "admin"
  active?: boolean
  created_at?: string
}

export type AdminUserUpdate = Partial<AdminUserInsert>

/**
 * Product shape consumed by the current public UI and cart.
 * It keeps the legacy display fields while also carrying database metadata.
 */
export interface Product {
  id: string | number
  name: string
  slug?: string | null
  category?: string
  description?: string | null
  price?: number
  oldPrice?: number | null
  pricePerKg?: string
  pricePerKgOld?: string
  priceUnit: string
  unitLabel?: string
  unitInfo: string
  discount?: string
  isNew?: boolean
  featured?: boolean
  available?: boolean
  image: string
  imageUrl?: string | null
  tag?: string
}

export interface ProductSection {
  id: string
  title: string
  description: string
  products: Product[]
}

export interface ProductFormState {
  message: string
  errors?: Record<string, string>
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow
        Insert: ProductInsert
        Update: ProductUpdate
        Relationships: []
      }
      admin_users: {
        Row: AdminUserRow
        Insert: AdminUserInsert
        Update: AdminUserUpdate
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
