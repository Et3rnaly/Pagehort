import { toggleProductAvailabilityAction } from "@/app/actions/product-actions"
import { Button } from "@/components/ui/button"
import type { ProductRow } from "@/src/types"

interface ProductStatusToggleProps {
  product: ProductRow
}

export function ProductStatusToggle({ product }: ProductStatusToggleProps) {
  return (
    <form action={toggleProductAvailabilityAction}>
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="available" value={String(product.available)} />
      <Button
        type="submit"
        size="sm"
        variant={product.available ? "outline" : "secondary"}
        className="rounded-full"
      >
        {product.available ? "Disponível" : "Indisponível"}
      </Button>
    </form>
  )
}
