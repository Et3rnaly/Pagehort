// =============================================================================
// Navigation Configuration - Zé das Frutas Hortifruti
// =============================================================================

import type { NavLink } from "@/src/types"

export const mainNavLinks: NavLink[] = [
  { label: "Ofertas", href: "/ofertas" },
  { label: "Práticos", href: "/praticos" },
  { label: "Especial Saúde", href: "/especial-saude" },
  { label: "Encomendas", href: "/encomendas" },
  { label: "Nossa Marca", href: "/nossa-marca", hasIcon: true },
  { label: "Receitas", href: "/receitas" },
  { label: "Blog", href: "/blog" },
]

export const footerLinks = {
  institucional: {
    title: "Institucional",
    links: [
      { label: "Quem Somos", href: "/quem-somos" },
      { label: "Nossas Lojas", href: "/lojas" },
      { label: "Trabalhe Conosco", href: "/carreiras" },
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
  ajuda: {
    title: "Ajuda",
    links: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Como Comprar", href: "/como-comprar" },
      { label: "Formas de Pagamento", href: "/pagamento" },
      { label: "Entrega", href: "/entrega" },
      { label: "Trocas e Devoluções", href: "/trocas" },
    ],
  },
  contato: {
    title: "Contato",
    links: [
      { label: "Fale Conosco", href: "/contato" },
      { label: "WhatsApp: (11) 9 9999-9999", href: "https://wa.me/5511999999999" },
      { label: "contato@zedasfrutas.com.br", href: "mailto:contato@zedasfrutas.com.br" },
    ],
  },
} as const
