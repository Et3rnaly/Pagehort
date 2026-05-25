// =============================================================================
// Core Domain Types - Zé das Frutas Hortifruti
// =============================================================================

export type {
  Database,
  AdminUserInsert,
  AdminUserRow,
  AdminUserUpdate,
  Product,
  ProductFormState,
  ProductInsert,
  ProductRow,
  ProductSection,
  ProductUpdate,
} from "./product"

/**
 * Department represents a store section/category
 */
export interface Department {
  name: string
  icon: string
  color: string
  href: string
}

/**
 * Banner represents a hero carousel slide
 */
export interface Banner {
  id: number
  title: string
  subtitle: string
  bgColor: string
  image?: string
  imagePosition?: string
  ctaText?: string
  ctaHref?: string
}

/**
 * Offer represents a promotional banner card
 */
export interface Offer {
  id: number
  title: string
  description: string
  bgColor: string
  icon: string
  href: string
}

/**
 * Article represents blog/recipe content
 */
export interface Article {
  id: number
  title: string
  description: string
  image: string
  type: "blog" | "receita"
  href: string
}

/**
 * Feature represents a value proposition
 */
export interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

/**
 * NavLink represents a navigation item
 */
export interface NavLink {
  label: string
  href: string
  hasIcon?: boolean
}

/**
 * FooterLinkGroup represents a footer section
 */
export interface FooterLinkGroup {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

/**
 * SocialLink represents a social media link
 */
export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}
