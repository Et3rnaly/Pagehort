import { redirect } from "next/navigation"
import { Leaf } from "lucide-react"
import { loginAction } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentAdminUser } from "@/src/lib/supabase/server"

const ERROR_MESSAGES: Record<string, string> = {
  "invalid-credentials": "E-mail ou senha inválidos. Confira os dados e tente novamente.",
  "missing-fields": "Informe e-mail e senha para entrar.",
  "supabase-config": "Configure as variáveis do Supabase antes de acessar o painel.",
  "admin-permission": "Seu usuário não tem permissão de administrador ativa.",
}

const STATUS_MESSAGES: Record<string, string> = {
  logout: "Você saiu do painel com segurança.",
}

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const adminSession = await getCurrentAdminUser()

  if (adminSession) {
    redirect("/admin/produtos")
  }

  const params = await searchParams
  const error = getParam(params, "error")
  const status = getParam(params, "status")

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Entrar no painel</h1>
            <p className="text-sm text-muted-foreground">Administração de produtos e preços.</p>
          </div>
        </div>

        {error && ERROR_MESSAGES[error] && (
          <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {ERROR_MESSAGES[error]}
          </div>
        )}

        {status && STATUS_MESSAGES[status] && (
          <div className="mb-4 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
            {STATUS_MESSAGES[status]}
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="h-11 w-full rounded-full">
            Entrar
          </Button>
        </form>
      </section>
    </main>
  )
}

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}
