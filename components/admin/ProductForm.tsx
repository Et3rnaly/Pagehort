"use client"

import Link from "next/link"
import Image from "next/image"
import { useActionState } from "react"
import type { ReactNode } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { isRemoteImageSource } from "@/src/lib/images"
import type { ProductFormState, ProductRow } from "@/src/types"

type ProductFormAction = (
  state: ProductFormState,
  formData: FormData
) => Promise<ProductFormState>

interface ProductFormProps {
  action: ProductFormAction
  product?: ProductRow
  categories?: string[]
  submitLabel: string
}

const INITIAL_STATE: ProductFormState = {
  message: "",
  errors: {},
}

export function ProductForm({
  action,
  product,
  categories = [],
  submitLabel,
}: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_STATE)

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      <input type="hidden" name="current_image_url" value={product?.image_url ?? ""} />

      {state.message && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </div>
      )}

      {state.errors?.form && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.errors.form}
        </div>
      )}

      <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nome do produto" error={state.errors?.name}>
            <Input name="name" defaultValue={product?.name ?? ""} required />
          </Field>

          <Field label="Slug" error={state.errors?.slug}>
            <Input name="slug" defaultValue={product?.slug ?? ""} placeholder="gerado pelo nome" />
          </Field>

          <Field label="Categoria" error={state.errors?.category}>
            <Input
              name="category"
              defaultValue={product?.category ?? ""}
              list="product-categories"
              required
              placeholder="frutas"
            />
            <datalist id="product-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>

          <Field label="Unidade" error={state.errors?.unit_label}>
            <Input
              name="unit_label"
              defaultValue={product?.unit_label ?? ""}
              required
              placeholder="kg, unidade, bandeja, pacote"
            />
          </Field>

          <Field label="Preço atual" error={state.errors?.price}>
            <Input
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product?.price ?? ""}
              required
            />
          </Field>

          <Field label="Preço antigo" error={state.errors?.old_price}>
            <Input
              name="old_price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product?.old_price ?? ""}
            />
          </Field>

          <Field label="Informação de unidade">
            <Input
              name="unit_info"
              defaultValue={product?.unit_info ?? ""}
              placeholder="Aprox. 400g"
            />
          </Field>

          <Field label="Rótulo de desconto">
            <Input
              name="discount_label"
              defaultValue={product?.discount_label ?? ""}
              placeholder="-25%"
            />
          </Field>

          <Field label="Ordem de exibição">
            <Input
              name="sort_order"
              type="number"
              step="1"
              defaultValue={product?.sort_order ?? 0}
            />
          </Field>

          <Field label="Imagem do produto" error={state.errors?.image}>
            <Input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
          </Field>
        </div>

        {product?.image_url && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/40 p-3">
            <Image
              src={product.image_url}
              alt={product.name}
              width={56}
              height={56}
              sizes="56px"
              className="h-14 w-14 rounded-md object-cover"
              unoptimized={isRemoteImageSource(product.image_url)}
            />
            <div>
              <p className="text-sm font-medium text-foreground">Imagem atual</p>
              <p className="line-clamp-1 text-xs text-muted-foreground">{product.image_url}</p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={product?.description ?? ""}
            className="min-h-28 resize-none"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <CheckboxField
            name="featured"
            label="Produto em destaque"
            defaultChecked={product?.featured ?? false}
          />
          <CheckboxField
            name="available"
            label="Produto disponível"
            defaultChecked={product?.available ?? true}
          />
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/admin/produtos">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <Button type="submit" className="rounded-full" disabled={isPending}>
          <Save className="h-4 w-4" />
          {isPending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  )
}

function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string
  label: string
  defaultChecked: boolean
}) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-background px-3 text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  )
}
