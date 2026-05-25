"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { generateSlug } from "@/src/lib/slug"
import { SUPABASE_PRODUCT_IMAGES_BUCKET } from "@/src/lib/supabase/config"
import { requireAdminUser } from "@/src/lib/supabase/server"
import type { ProductFormState, ProductInsert, ProductUpdate } from "@/src/types"

const ALLOWED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"])
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

export async function createProductAction(
  _state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const { supabase } = await requireAdminUser()
  const parsed = parseProductForm(formData)

  if (Object.keys(parsed.errors).length > 0) {
    return {
      message: "Revise os campos destacados.",
      errors: parsed.errors,
    }
  }

  const imageResult = await uploadProductImage(formData, parsed.payload.slug ?? parsed.payload.name)

  if (imageResult.error) {
    return {
      message: "Não foi possível enviar a imagem.",
      errors: { image: imageResult.error },
    }
  }

  const { error } = await supabase.from("products").insert({
    ...parsed.payload,
    image_url: imageResult.publicUrl,
  })

  if (error) {
    return {
      message: friendlyProductError(error.message),
      errors: { form: friendlyProductError(error.message) },
    }
  }

  revalidateProductPaths()
  redirect("/admin/produtos?status=created")
}

export async function updateProductAction(
  productId: string,
  _state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const { supabase } = await requireAdminUser()
  const parsed = parseProductForm(formData)

  if (Object.keys(parsed.errors).length > 0) {
    return {
      message: "Revise os campos destacados.",
      errors: parsed.errors,
    }
  }

  const currentImageUrl = String(formData.get("current_image_url") ?? "").trim() || null
  const imageResult = await uploadProductImage(formData, parsed.payload.slug ?? parsed.payload.name)

  if (imageResult.error) {
    return {
      message: "Não foi possível enviar a imagem.",
      errors: { image: imageResult.error },
    }
  }

  const payload: ProductUpdate = {
    ...parsed.payload,
    image_url: imageResult.publicUrl ?? currentImageUrl,
  }

  const { error } = await supabase.from("products").update(payload).eq("id", productId)

  if (error) {
    return {
      message: friendlyProductError(error.message),
      errors: { form: friendlyProductError(error.message) },
    }
  }

  revalidateProductPaths()
  redirect("/admin/produtos?status=updated")
}

export async function toggleProductAvailabilityAction(formData: FormData) {
  const { supabase } = await requireAdminUser()
  const productId = String(formData.get("id") ?? "")
  const currentAvailable = String(formData.get("available") ?? "") === "true"

  if (!productId) return

  await supabase.from("products").update({ available: !currentAvailable }).eq("id", productId)
  revalidateProductPaths()
}

export async function deleteProductAction(formData: FormData) {
  const { supabase } = await requireAdminUser()
  const productId = String(formData.get("id") ?? "")

  if (!productId) return

  await supabase.from("products").delete().eq("id", productId)
  revalidateProductPaths()
}

function parseProductForm(formData: FormData) {
  const errors: Record<string, string> = {}
  const name = getText(formData, "name")
  const rawSlug = getText(formData, "slug")
  const rawCategory = getText(formData, "category")
  const unitLabel = getText(formData, "unit_label").toLowerCase()
  const price = parseDecimalField(formData, "price")
  const oldPrice = parseOptionalDecimalField(formData, "old_price")
  const sortOrder = parseIntegerField(formData, "sort_order")

  if (!name) errors.name = "Informe o nome do produto."
  if (!rawCategory) errors.category = "Informe a categoria."
  if (!unitLabel) errors.unit_label = "Informe a unidade."
  if (price === null || price < 0) errors.price = "Informe um preço atual maior ou igual a zero."
  if (oldPrice !== null && oldPrice < 0) errors.old_price = "O preço antigo deve ser maior ou igual a zero."

  const slug = generateSlug(rawSlug || name)
  const category = generateSlug(rawCategory)

  if (!slug) errors.slug = "Informe um slug válido ou um nome que gere slug."
  if (!category) errors.category = "Informe uma categoria válida."

  const payload: ProductInsert = {
    name,
    slug,
    category,
    description: getNullableText(formData, "description"),
    price: price ?? 0,
    old_price: oldPrice,
    unit_label: unitLabel,
    unit_info: getNullableText(formData, "unit_info"),
    discount_label: getNullableText(formData, "discount_label"),
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
    sort_order: sortOrder ?? 0,
  }

  return { payload, errors }
}

async function uploadProductImage(formData: FormData, slugBase: string) {
  const image = formData.get("image")

  if (!(image instanceof File) || image.size === 0) {
    return { publicUrl: null, error: null }
  }

  const extension = image.name.split(".").pop()?.toLowerCase()

  if (
    !extension ||
    !ALLOWED_IMAGE_EXTENSIONS.has(extension) ||
    (image.type && !ALLOWED_IMAGE_TYPES.has(image.type))
  ) {
    return {
      publicUrl: null,
      error: "Use uma imagem JPG, JPEG, PNG ou WEBP.",
    }
  }

  const { supabase } = await requireAdminUser()
  const objectPath = `products/${generateSlug(slugBase)}-${Date.now()}.${extension}`
  const { error } = await supabase.storage
    .from(SUPABASE_PRODUCT_IMAGES_BUCKET)
    .upload(objectPath, image, {
      cacheControl: "3600",
      contentType: image.type || undefined,
      upsert: false,
    })

  if (error) {
    return {
      publicUrl: null,
      error: error.message,
    }
  }

  const { data } = supabase.storage.from(SUPABASE_PRODUCT_IMAGES_BUCKET).getPublicUrl(objectPath)

  return {
    publicUrl: data.publicUrl,
    error: null,
  }
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function getNullableText(formData: FormData, key: string) {
  const value = getText(formData, key)
  return value || null
}

function parseDecimalField(formData: FormData, key: string) {
  const value = getText(formData, key).replace(",", ".")
  if (!value) return null

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function parseOptionalDecimalField(formData: FormData, key: string) {
  const value = getText(formData, key)
  if (!value) return null

  return parseDecimalField(formData, key)
}

function parseIntegerField(formData: FormData, key: string) {
  const value = getText(formData, key)
  if (!value) return 0

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : 0
}

function friendlyProductError(message: string) {
  if (message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("unique")) {
    return "Já existe um produto com este slug. Ajuste o slug e tente novamente."
  }

  return message || "Não foi possível salvar o produto."
}

function revalidateProductPaths() {
  revalidatePath("/")
  revalidatePath("/admin/produtos")
}
