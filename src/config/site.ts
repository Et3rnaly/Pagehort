// =============================================================================
// Site Configuration - Zé das Frutas Hortifruti
// =============================================================================

export const siteConfig = {
  name: "Zé das Frutas",
  tagline: "Hortifrúti Fresh & Delivery",
  description: "Levando saúde e frescor para sua mesa desde 1995. Qualidade e naturalidade em cada produto.",
  url: "https://zedasfrutas.com.br",
  
  contact: {
    email: "contato@zedasfrutas.com.br",
    whatsapp: "(11) 9 9999-9999",
    location: "São Paulo, SP",
  },
  
  company: {
    name: "Zé das Frutas Hortifrúti Ltda.",
    cnpj: "00.000.000/0001-00",
    foundedYear: 1995,
  },
  
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
} as const

export type SiteConfig = typeof siteConfig
