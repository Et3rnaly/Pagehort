"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient, getActiveAdminUser } from "@/src/lib/supabase/server"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect("/admin/login?error=supabase-config")
  }

  if (!email || !password) {
    redirect("/admin/login?error=missing-fields")
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect("/admin/login?error=invalid-credentials")
  }

  const adminUser = data.user ? await getActiveAdminUser(supabase, data.user.id) : null

  if (!adminUser) {
    await supabase.auth.signOut()
    redirect("/admin/login?error=admin-permission")
  }

  redirect("/admin/produtos?status=login")
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient()

  if (supabase) {
    await supabase.auth.signOut()
  }

  redirect("/admin/login?status=logout")
}
