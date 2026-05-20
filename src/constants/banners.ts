// =============================================================================
// Banner Data - Ze das Frutas Hortifruti
// =============================================================================

import type { Banner, Offer } from "@/src/types"

export const heroBanners: Banner[] = [
  {
    id: 1,
    title: "Uvas com leite condensado",
    subtitle: "Uma combinacao doce, fresca e irresistivel.",
    bgColor: "bg-[#102410]",
    image: "/banners/banner-uvas-leite-condensado.png",
    imagePosition: "center 56%",
    ctaText: "Comprar agora",
    ctaHref: "/ofertas/frutas",
  },
  {
    id: 2,
    title: "Snacks Fitness",
    subtitle: "Opcoes leves e crocantes para sua rotina.",
    bgColor: "bg-[#103914]",
    image: "/banners/banner-snacks-fitness.png",
    imagePosition: "center",
    ctaText: "Conhecer",
    ctaHref: "/praticos",
  },
  {
    id: 3,
    title: "Praticidade",
    subtitle: "Produtos prontos para deixar seu fim de semana mais leve.",
    bgColor: "bg-[#143a0d]",
    image: "/banners/banner-praticidade.png",
    imagePosition: "center",
    ctaText: "Comprar agora",
    ctaHref: "/praticos",
  },
  {
    id: 4,
    title: "Aqui tem de tudo",
    subtitle: "Variedade, frescor e conveniencia para o dia a dia.",
    bgColor: "bg-[#183b0d]",
    image: "/banners/banner-aqui-tem-de-tudo.png",
    imagePosition: "center",
    ctaText: "Conhecer",
    ctaHref: "/ofertas",
  },
  {
    id: 5,
    title: "Selecao gourmet",
    subtitle: "Ingredientes selecionados, momentos que ficam.",
    bgColor: "bg-[#3b281c]",
    image: "/banners/banner-selecao-gourmet.png",
    imagePosition: "center",
    ctaText: "Comprar agora",
    ctaHref: "/ofertas",
  },
]

export const promotionalOffers: Offer[] = [
  {
    id: 1,
    title: "Frutas da Estacao",
    description: "Aproveite o melhor das frutas frescas",
    bgColor: "bg-gradient-to-br from-red-500 to-orange-500",
    icon: "🍎",
    href: "/ofertas/frutas",
  },
  {
    id: 2,
    title: "Vinhos Selecionados",
    description: "Os melhores rotulos com desconto",
    bgColor: "bg-gradient-to-br from-purple-600 to-purple-800",
    icon: "🍷",
    href: "/adega",
  },
]
