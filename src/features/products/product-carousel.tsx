"use client"

import { SectionHeader } from "@/src/components/shared"
import { HorizontalCarousel } from "@/src/components/shared"
import { ProductCard } from "@/src/components/shared"
import type { Product } from "@/src/types"

interface ProductCarouselProps {
  title: string
  subtitle?: string
  products?: Product[]
  viewAllHref?: string
}

export function ProductCarousel({ 
  title, 
  subtitle, 
  products = [], 
  viewAllHref 
}: ProductCarouselProps) {
  return (
    <section className="py-8" aria-labelledby={`products-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="container mx-auto px-4">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref={viewAllHref}
          viewAllText="Ver lista"
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
