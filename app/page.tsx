import { Header, Footer, FloatingCart } from "@/src/components/layout"
import {
  HeroBanner,
  DepartmentsSection,
  ProductCarousel,
  OffersSection,
  PracticalitySection,
  ContentSection,
  NewsletterSection,
} from "@/src/features"
import { productSections } from "@/src/constants"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroBanner />
        <DepartmentsSection />
        {productSections.map((section) => (
          <ProductCarousel
            key={section.id}
            title={section.title}
            subtitle={section.description}
            products={section.products}
          />
        ))}
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
