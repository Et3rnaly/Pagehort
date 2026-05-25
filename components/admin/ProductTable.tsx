import Link from "next/link"
import Image from "next/image"
import { Edit } from "lucide-react"
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"
import { ProductStatusToggle } from "@/components/admin/ProductStatusToggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/src/lib/formatters/currency"
import { isRemoteImageSource } from "@/src/lib/images"
import { formatCategoryLabel } from "@/src/lib/product-sections"
import type { ProductRow } from "@/src/types"

interface ProductTableProps {
  products: ProductRow[]
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card px-4 py-12 text-center">
        <p className="font-medium text-foreground">Nenhum produto encontrado.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Ajuste a busca ou cadastre um novo produto.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Imagem</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="hidden md:table-cell">Preço antigo</TableHead>
            <TableHead className="hidden md:table-cell">Unidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Destaque</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <ProductThumb product={product} />
              </TableCell>
              <TableCell>
                <div className="max-w-[240px]">
                  <p className="line-clamp-2 font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.slug}</p>
                </div>
              </TableCell>
              <TableCell>{formatCategoryLabel(product.category)}</TableCell>
              <TableCell className="font-semibold text-primary">
                {formatCurrency(Number(product.price))}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {product.old_price === null ? "-" : formatCurrency(Number(product.old_price))}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <p>{product.unit_label}</p>
                  {product.unit_info && (
                    <p className="text-xs text-muted-foreground">{product.unit_info}</p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <ProductStatusToggle product={product} />
              </TableCell>
              <TableCell>
                <Badge variant={product.featured ? "default" : "outline"}>
                  {product.featured ? "Sim" : "Não"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <Link href={`/admin/produtos/${product.id}/editar`}>
                      <Edit className="h-4 w-4" />
                      Editar
                    </Link>
                  </Button>
                  <DeleteProductButton productId={product.id} productName={product.name} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ProductThumb({ product }: { product: ProductRow }) {
  if (product.image_url) {
    return (
      <Image
        src={product.image_url}
        alt={product.name}
        width={48}
        height={48}
        sizes="48px"
        className="h-12 w-12 rounded-md object-cover"
        loading="lazy"
        unoptimized={isRemoteImageSource(product.image_url)}
      />
    )
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
      Sem imagem
    </div>
  )
}
