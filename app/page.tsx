import { Header, Footer, FloatingCart } from "@/src/components/layout"
import { HeroBanner } from "@/src/features/hero"
import { DepartmentsSection } from "@/src/features/departments"
import { ProductCarousel } from "@/src/features/products"
import { OffersSection } from "@/src/features/offers"
import { PracticalitySection } from "@/src/features/practicality"
import { ContentSection } from "@/src/features/content"
import { NewsletterSection } from "@/src/features/newsletter"
import { getPublicProductSections } from "@/src/lib/products"

export const revalidate = 60

export default async function HomePage() {
  const productSections = await getPublicProductSections()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroBanner />
        <DepartmentsSection />
        <div id="produtos" className="scroll-mt-40">
          {productSections.map((section) => (
            <ProductCarousel
              key={section.id}
              title={section.title}
              subtitle={section.description}
              products={section.products}
              sectionId={`produtos-${section.id}`}
            />
          ))}
        </div>
        <OffersSection />
        <PracticalitySection />
        <ContentSection />
        <NewsletterSection />
      </main>
      <Footer />
      <FloatingCart />
    </>
  )
}
