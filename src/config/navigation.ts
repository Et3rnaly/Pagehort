// =============================================================================
// Navigation Configuration - Zé das Frutas Hortifruti
// =============================================================================

import type { NavLink } from "@/src/types"

export const mainNavLinks: NavLink[] = [
  { label: "Ofertas", href: "#ofertas" },
  { label: "Práticos", href: "#praticidade" },
  { label: "Receitas", href: "#conteudos" },
  { label: "Blog", href: "#conteudos" },
]

export const footerLinks = {
  institucional: {
    title: "Institucional",
    links: [
      { label: "Quem Somos", futureHref: "/quem-somos" },
      { label: "Nossas Lojas", futureHref: "/lojas" },
      { label: "Trabalhe Conosco", futureHref: "/carreiras" },
      { label: "Política de Privacidade", futureHref: "/privacidade" },
      { label: "Termos de Uso", futureHref: "/termos" },
    ],
  },
  ajuda: {
    title: "Ajuda",
    links: [
      { label: "Central de Ajuda", futureHref: "/ajuda" },
      { label: "Como Comprar", futureHref: "/como-comprar" },
      { label: "Formas de Pagamento", futureHref: "/pagamento" },
      { label: "Entrega", futureHref: "/entrega" },
      { label: "Trocas e Devoluções", futureHref: "/trocas" },
    ],
  },
  contato: {
    title: "Contato",
    links: [
      { label: "Fale Conosco", href: "mailto:contato@zedasfrutas.com.br" },
      { label: "WhatsApp: (11) 9 9999-9999", href: "https://wa.me/5511999999999" },
      { label: "contato@zedasfrutas.com.br", href: "mailto:contato@zedasfrutas.com.br" },
    ],
  },
} as const
