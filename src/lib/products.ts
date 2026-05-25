import { formatCurrency } from "@/src/lib/formatters/currency"
import {
  formatCategoryLabel,
  normalizeCategoryKey,
  productSectionDefinitions,
} from "@/src/lib/product-sections"
import { createClient } from "@supabase/supabase-js"
import { productSections as staticProductSections } from "@/src/constants/products"
import { getSupabaseConfig } from "@/src/lib/supabase/config"
import { createSupabaseServerClient } from "@/src/lib/supabase/server"
import type { Product, ProductRow, ProductSection } from "@/src/types"
import type { Database } from "@/src/types/product"

export const PRODUCT_SELECT =
  "id,name,slug,category,description,image_url,price,old_price,unit_label,unit_info,discount_label,featured,available,sort_order,created_at,updated_at"

const CATEGORY_ICONS: Record<string, string> = {
  combos: "🛒",
  frutas: "🍎",
  "legumes-verduras": "🥕",
  "folhas-temperos": "🌿",
  "prontos-processados": "🥗",
  "congelados-proteinas": "❄️",
  "polpas-cremes": "🥤",
  ovos: "🥚",
  mercearia: "🛍️",
  bebidas: "🥤",
  padaria: "🍞",
  churrasco: "🔥",
}

export function productRowToProduct(row: ProductRow): Product {
  const price = Number(row.price)
  const oldPrice = row.old_price === null ? null : Number(row.old_price)
  const categoryKey = normalizeCategoryKey(row.category)
  const unitLabel = row.unit_label.trim()
  const unitInfo = row.unit_info?.trim() || unitLabel
  const isWeighted = unitLabel.toLowerCase() === "kg"

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    description: row.description,
    price,
    oldPrice,
    pricePerKg: isWeighted ? `${formatCurrency(price)}/kg` : undefined,
    pricePerKgOld: oldPrice !== null ? formatCurrency(oldPrice) : undefined,
    priceUnit: formatCurrency(price),
    unitLabel,
    unitInfo,
    discount: row.discount_label || undefined,
    featured: row.featured,
    available: row.available,
    image: CATEGORY_ICONS[categoryKey] ?? "🛒",
    imageUrl: row.image_url,
    tag: row.featured ? "Destaque" : undefined,
  }
}

export function buildProductSections(rows: ProductRow[]): ProductSection[] {
  const productsByCategory = rows.reduce<Map<string, Product[]>>((sections, row) => {
    const categoryKey = normalizeCategoryKey(row.category)
    const products = sections.get(categoryKey) ?? []

    products.push(productRowToProduct(row))
    sections.set(categoryKey, products)

    return sections
  }, new Map())

  const knownSections = productSectionDefinitions
    .map((section) => ({
      ...section,
      products: productsByCategory.get(section.id) ?? [],
    }))
    .filter((section) => section.products.length > 0)

  const knownIds = new Set<string>(productSectionDefinitions.map((section) => section.id))
  const customSections = Array.from(productsByCategory.entries())
    .filter(([category]) => !knownIds.has(category))
    .map(([category, products]) => ({
      id: category,
      title: formatCategoryLabel(category),
      description: "Produtos cadastrados nesta categoria.",
      products,
    }))

  return [...knownSections, ...customSections]
}

export async function getPublicProductSections() {
  const config = getSupabaseConfig()

  if (!config) return getStaticProductSections()

  try {
    const supabase = createClient<Database>(config.url, config.publicKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("available", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao carregar produtos públicos do Supabase:", error.message)
      return getStaticProductSections()
    }

    return buildProductSections((data ?? []) as ProductRow[])
  } catch (error) {
    console.error("Erro de conexão ao carregar produtos públicos do Supabase:", error)
    return getStaticProductSections()
  }
}

export async function getProductById(id: string) {
  const supabase = await createSupabaseServerClient()

  if (!supabase) return null

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("Erro ao carregar produto do Supabase:", error.message)
    return null
  }

  return data as ProductRow | null
}

function getStaticProductSections(): ProductSection[] {
  return staticProductSections
}
