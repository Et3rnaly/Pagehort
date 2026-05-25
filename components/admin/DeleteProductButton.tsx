"use client"

import { Trash2 } from "lucide-react"
import { deleteProductAction } from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"

interface DeleteProductButtonProps {
  productId: string
  productName: string
}

export function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  return (
    <form
      action={deleteProductAction}
      onSubmit={(event) => {
        if (!window.confirm(`Excluir definitivamente "${productName}"?`)) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={productId} />
      <Button type="submit" size="sm" variant="destructive" className="rounded-full">
        <Trash2 className="h-4 w-4" />
        Excluir
      </Button>
    </form>
  )
}
