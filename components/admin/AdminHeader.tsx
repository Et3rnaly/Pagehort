import Link from "next/link"
import { LogOut, PackagePlus } from "lucide-react"
import { logoutAction } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  userEmail?: string | null
}

export function AdminHeader({ userEmail }: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/produtos" className="text-xl font-bold text-primary">
            Painel Zé das Frutas
          </Link>
          {userEmail && <p className="text-sm text-muted-foreground">{userEmail}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild className="rounded-full">
            <Link href="/admin/produtos/novo">
              <PackagePlus className="h-4 w-4" />
              Novo produto
            </Link>
          </Button>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="rounded-full">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
