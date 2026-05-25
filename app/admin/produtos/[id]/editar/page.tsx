import { notFound } from "next/navigation"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductForm } from "@/components/admin/ProductForm"
import { updateProductAction } from "@/app/actions/product-actions"
import { PRODUCT_SELECT } from "@/src/lib/products"
import { knownProductCategoryIds } from "@/src/lib/product-sections"
import { requireAdminUser } from "@/src/lib/supabase/server"
import type { ProductRow } from "@/src/types"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const { supabase, user } = await requireAdminUser()
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle()

  if (error || !data) {
    notFound()
  }

  const product = data as ProductRow
  const action = updateProductAction.bind(null, product.id)
  const categories = Array.from(new Set([...knownProductCategoryIds, product.category])).sort()

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-primary">Editar produto</p>
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
        </div>

        <ProductForm
          action={action}
          product={product}
          categories={categories}
          submitLabel="Salvar alterações"
        />
      </main>
    </>
  )
}
