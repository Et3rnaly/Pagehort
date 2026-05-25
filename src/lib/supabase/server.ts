import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import type { Database } from "@/src/types/product"
import { getSupabaseConfig } from "./config"

export async function createSupabaseServerClient() {
  const config = getSupabaseConfig()

  if (!config) return null

  const cookieStore = await cookies()

  return createServerClient<Database>(config.url, config.publicKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot always write cookies; proxy.ts refreshes the session.
        }
      },
    },
  })
}

export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect("/admin/login?error=supabase-config")
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  const adminUser = await getActiveAdminUser(supabase, user.id)

  if (!adminUser) {
    redirect("/admin/login?error=admin-permission")
  }

  return { supabase, user, adminUser }
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient()

  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getCurrentAdminUser() {
  const supabase = await createSupabaseServerClient()

  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const adminUser = await getActiveAdminUser(supabase, user.id)

  if (!adminUser) return null

  return { user, adminUser }
}

export async function getActiveAdminUser(
  supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  userId: string
) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id,role,active,created_at")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle()

  if (error) {
    console.error("Erro ao validar permissão admin:", error.message)
    return null
  }

  return data
}
