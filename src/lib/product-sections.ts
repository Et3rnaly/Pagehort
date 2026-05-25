import { generateSlug } from "@/src/lib/slug"

export const productSectionDefinitions = [
  {
    id: "combos",
    title: "Combos em Destaque",
    description: "Cestas prontas para facilitar as compras da semana.",
  },
  {
    id: "frutas",
    title: "Frutas Frescas",
    description: "Seleção de frutas para o dia a dia.",
  },
  {
    id: "legumes-verduras",
    title: "Legumes e Verduras",
    description: "Produtos frescos para sua cozinha.",
  },
  {
    id: "folhas-temperos",
    title: "Folhas, Ervas e Temperos",
    description: "Mais frescor e sabor nas suas receitas.",
  },
  {
    id: "prontos-processados",
    title: "Prontos e Processados",
    description: "Praticidade para consumir ou preparar.",
  },
  {
    id: "congelados-proteinas",
    title: "Congelados e Proteínas",
    description: "Carnes, peixes, salgados e congelados.",
  },
  {
    id: "polpas-cremes",
    title: "Polpas, Cremes e Frutas Congeladas",
    description: "Ideais para sucos, vitaminas e sobremesas.",
  },
  {
    id: "ovos",
    title: "Ovos",
    description: "Opções caipiras, brancas e vermelhas.",
  },
  {
    id: "mercearia",
    title: "Mercearia",
    description: "Itens essenciais para completar a compra.",
  },
  {
    id: "bebidas",
    title: "Bebidas",
    description: "Refrigerantes, água e opções geladas.",
  },
  {
    id: "padaria",
    title: "Padaria",
    description: "Pães, bisnagas, bolos e complementos.",
  },
  {
    id: "churrasco",
    title: "Churrasco",
    description: "Itens extras para o fim de semana.",
  },
] as const

export const knownProductCategoryIds = productSectionDefinitions.map((section) => section.id)

export function normalizeCategoryKey(category: string) {
  return generateSlug(category)
}

export function formatCategoryLabel(category: string) {
  const knownSection = productSectionDefinitions.find(
    (section) => section.id === normalizeCategoryKey(category)
  )

  if (knownSection) return knownSection.title

  return category
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
