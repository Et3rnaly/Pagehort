import { HorizontalCarousel } from "@/src/components/shared/horizontal-carousel"
import { ProductCard } from "@/src/components/shared/product-card"
import { SectionHeader } from "@/src/components/shared/section-header"
import type { Product } from "@/src/types"

interface BrothsSectionProps {
  products?: Product[]
}

export function BrothsSection({ products = [] }: BrothsSectionProps) {
  return (
    <section className="py-8" aria-labelledby="broths-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Sopas e Caldos"
          titleId="broths-title"
        />

        <HorizontalCarousel showNavigation={false}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="compact" />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  )
}
