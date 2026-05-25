import { SectionHeader, HorizontalCarousel } from "@/src/components/shared"
import { AddToCartButton } from "@/src/features/cart"
import type { Product } from "@/src/types"

interface OurBrandsSectionProps {
  products?: Product[]
}

export function OurBrandsSection({ products = [] }: OurBrandsSectionProps) {
  return (
    <section className="py-8 bg-muted" aria-labelledby="brands-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Nossa Marca"
          badge="APROVEITE"
          titleId="brands-title"
        />

        <HorizontalCarousel showNavigation={false}>
          {products.map((product) => (
            <div 
              key={product.id}
              className="min-w-[180px] bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                  <span className="text-5xl">{product.image}</span>
                </div>
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground line-through">{product.pricePerKgOld}</p>
              <p className="text-lg font-bold text-primary">{product.priceUnit}</p>
              <AddToCartButton
                product={product}
                size="sm"
                className="mt-3 w-full rounded-full"
              />
            </div>
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  )
}
