import { AdminHeader } from "@/components/admin/AdminHeader"
import { ProductForm } from "@/components/admin/ProductForm"
import { createProductAction } from "@/app/actions/product-actions"
import { knownProductCategoryIds } from "@/src/lib/product-sections"
import { requireAdminUser } from "@/src/lib/supabase/server"

export default async function NewProductPage() {
  const { user } = await requireAdminUser()

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-primary">Novo produto</p>
          <h1 className="text-3xl font-bold text-foreground">Cadastrar produto</h1>
        </div>

        <ProductForm
          action={createProductAction}
          categories={knownProductCategoryIds}
          submitLabel="Salvar produto"
        />
      </main>
    </>
  )
}
