export const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export function formatCurrency(value: number) {
  return brlCurrencyFormatter.format(value)
}

export function parseBrazilianCurrency(value: string) {
  const normalizedValue = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".")

  const price = Number(normalizedValue)

  return Number.isFinite(price) ? price : 0
}
