import { SectionHeader, ProductCard, HorizontalCarousel } from "@/src/components/shared"
import type { Product } from "@/src/types"

interface SpecialDietsSectionProps {
  products?: Product[]
}

export function SpecialDietsSection({ products = [] }: SpecialDietsSectionProps) {
  return (
    <section className="py-8" aria-labelledby="diets-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Dietas Especiais"
          titleId="diets-title"
        />

        <HorizontalCarousel showNavigation={false}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} variant="diet" />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  )
}
