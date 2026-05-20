"use client"

import { ChevronRight } from "lucide-react"
import { SectionHeader } from "@/src/components/shared"
import { promotionalOffers } from "@/src/constants"
import type { Offer } from "@/src/types"

interface OffersSectionProps {
  offers?: Offer[]
}

export function OffersSection({ offers = promotionalOffers }: OffersSectionProps) {
  return (
    <section className="py-8 bg-muted" aria-labelledby="offers-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Ofertas"
          viewAllHref="/ofertas"
          viewAllText="Ver ofertas"
        />

        <div className="grid md:grid-cols-2 gap-4">
          {offers.map((offer) => (
            <a
              key={offer.id}
              href={offer.href}
              className={`${offer.bgColor} rounded-2xl p-6 text-primary-foreground hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="opacity-90">{offer.description}</p>
                </div>
                <span className="text-5xl" aria-hidden="true">{offer.icon}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
