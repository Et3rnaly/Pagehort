"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/src/types/product"
import { getSupabaseConfig } from "./config"

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig()

  if (!config) {
    throw new Error("Supabase nao esta configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  return createBrowserClient<Database>(config.url, config.publicKey)
}
