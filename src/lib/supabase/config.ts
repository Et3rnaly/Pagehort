export const SUPABASE_PRODUCT_IMAGES_BUCKET = "product-images"

const PUBLIC_SUPABASE_KEY_ENV_NAMES = [
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publicKey = getPublicSupabaseKey()

  if (!url || !publicKey) return null

  return { url, publicKey }
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig())
}

function getPublicSupabaseKey() {
  for (const envName of PUBLIC_SUPABASE_KEY_ENV_NAMES) {
    const value = process.env[envName]

    if (value) return value
  }

  return undefined
}
