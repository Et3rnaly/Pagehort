"use client"

import { Truck, Clock, Shield, Leaf } from "lucide-react"
import { SectionHeader } from "@/src/components/shared"
import type { Feature } from "@/src/types"

const features: Feature[] = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Receba seus produtos frescos no mesmo dia",
  },
  {
    icon: Clock,
    title: "Praticidade",
    description: "Compre online a qualquer hora do dia",
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Produtos selecionados com rigor",
  },
  {
    icon: Leaf,
    title: "Sempre Fresco",
    description: "Do produtor direto para sua mesa",
  },
]

interface PracticalitySectionProps {
  items?: Feature[]
}

export function PracticalitySection({ items = features }: PracticalitySectionProps) {
  return (
    <section className="py-12 bg-card" aria-labelledby="practicality-title">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Praticidade para o seu dia a dia"
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((feature) => (
            <div 
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
