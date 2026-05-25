import { HorizontalCarousel } from "@/src/components/shared/horizontal-carousel"
import { ProductCard } from "@/src/components/shared/product-card"
import { SectionHeader } from "@/src/components/shared/section-header"
import type { Product } from "@/src/types"

interface ProductCarouselProps {
  title: string
  subtitle?: string
  products?: Product[]
  viewAllHref?: string
  sectionId?: string
}

export function ProductCarousel({ 
  title, 
  subtitle, 
  products = [], 
  viewAllHref,
  sectionId,
}: ProductCarouselProps) {
  const titleId = `products-${title.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section
      id={sectionId}
      className="scroll-mt-40 py-8 [content-visibility:auto] [contain-intrinsic-size:720px]"
      aria-labelledby={titleId}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref={viewAllHref}
          viewAllText="Ver lista"
          titleId={titleId}
        />

        <HorizontalCarousel>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalCarousel>
      </div>
    </section>
  )
}
