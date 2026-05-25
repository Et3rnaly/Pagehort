import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/src/types/product"
import { getSupabaseConfig } from "./config"

export async function updateSession(request: NextRequest) {
  const config = getSupabaseConfig()
  let response = NextResponse.next({ request })

  if (!config) return response

  const supabase = createServerClient<Database>(config.url, config.publicKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })

        response = NextResponse.next({ request })

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAdminLogin = pathname === "/admin/login"
  const isProtectedAdminRoute = pathname.startsWith("/admin/produtos")
  const isAdmin = user ? await hasActiveAdminAccess(supabase) : false

  if (isProtectedAdminRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("redirectedFrom", pathname)
    return NextResponse.redirect(url)
  }

  if (isProtectedAdminRoute && user && !isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("error", "admin-permission")
    return NextResponse.redirect(url)
  }

  if (isAdminLogin && isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/produtos"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return response
}

async function hasActiveAdminAccess(
  supabase: SupabaseClient<Database>
) {
  const { data, error } = await supabase.rpc("is_admin")

  if (error) {
    console.error("Erro ao validar admin no proxy:", error.message)
    return false
  }

  return Boolean(data)
}
