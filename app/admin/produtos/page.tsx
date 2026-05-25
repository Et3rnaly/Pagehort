import Link from "next/link"
import { PackagePlus, Search } from "lucide-react"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductTable } from "@/components/admin/ProductTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PRODUCT_SELECT } from "@/src/lib/products"
import { formatCategoryLabel, knownProductCategoryIds } from "@/src/lib/product-sections"
import { requireAdminUser } from "@/src/lib/supabase/server"
import type { ProductRow } from "@/src/types"

const STATUS_MESSAGES: Record<string, string> = {
  created: "Produto criado com sucesso.",
  updated: "Produto atualizado com sucesso.",
  login: "Login realizado com sucesso.",
}

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminProductsPage({ searchParams }: ProductsPageProps) {
  const { supabase, user } = await requireAdminUser()
  const params = await searchParams
  const search = getParam(params, "busca") ?? ""
  const category = getParam(params, "categoria") ?? ""
  const status = getParam(params, "status")

  let query = supabase.from("products").select(PRODUCT_SELECT)

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  const { count: totalProducts } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })

  const products = (data ?? []) as ProductRow[]
  const categories = await getCategories(supabase)

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase text-primary">Produtos</p>
            <h1 className="text-3xl font-bold text-foreground">Catálogo administrativo</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalProducts ?? products.length} produtos no total · {products.length}{" "}
              {products.length === 1 ? "resultado exibido" : "resultados exibidos"}
            </p>
          </div>

          <Button asChild className="rounded-full">
            <Link href="/admin/produtos/novo">
              <PackagePlus className="h-4 w-4" />
              Novo produto
            </Link>
          </Button>
        </div>

        {status && STATUS_MESSAGES[status] && (
          <div className="mb-5 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
            {STATUS_MESSAGES[status]}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error.message}
          </div>
        )}

        <form className="mb-5 grid gap-3 rounded-lg border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_220px_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="busca"
              defaultValue={search}
              placeholder="Buscar por nome"
              className="pl-9"
            />
          </div>

          <select
            name="categoria"
            defaultValue={category}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">Todas as categorias</option>
            {categories.map((categoryId) => (
              <option key={categoryId} value={categoryId}>
                {formatCategoryLabel(categoryId)}
              </option>
            ))}
          </select>

          <Button type="submit" variant="outline" className="rounded-full">
            Filtrar
          </Button>

          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/admin/produtos">Limpar</Link>
          </Button>
        </form>

        <ProductTable products={products} />
      </main>
    </>
  )
}

async function getCategories(supabase: Awaited<ReturnType<typeof requireAdminUser>>["supabase"]) {
  const { data } = await supabase.from("products").select("category")
  const storedCategories = (data ?? []).map((product) => product.category)

  return Array.from(
    new Set([...knownProductCategoryIds, ...storedCategories])
  ).sort()
}

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}
