import { orderConfig } from "@/src/config/order"
import { formatCurrency, parseBrazilianCurrency } from "@/src/lib/formatters/currency"
import type { CartItem, CheckoutFormData, OrderType, PaymentMethod } from "./types"

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  delivery: "Delivery",
  pickup: "Retirada na loja",
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  cash: "Dinheiro",
  card: "Cartão",
}

export { formatCurrency, parseBrazilianCurrency }

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
}

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function buildWhatsAppOrderMessage(form: CheckoutFormData, items: CartItem[]) {
  const subtotal = getCartSubtotal(items)
  const orderType = form.orderType ? ORDER_TYPE_LABELS[form.orderType] : ""
  const schedule =
    form.scheduleMode === "asap" ? "O mais rápido possível" : form.scheduledTime.trim()
  const paymentMethod = form.paymentMethod ? PAYMENT_METHOD_LABELS[form.paymentMethod] : ""
  const lines = [
    "Olá! Gostaria de confirmar um pedido feito pelo site.",
    "",
    "*DADOS DO CLIENTE*",
    `Nome: ${form.customerName.trim()}`,
    `Telefone: ${form.phone.trim()}`,
    "",
    "*TIPO DE PEDIDO*",
    orderType,
  ]

  if (form.orderType === "delivery") {
    lines.push(
      "",
      "*ENDEREÇO DE ENTREGA*",
      `Endereço: ${form.address.trim()}, ${form.number.trim()}`,
      `Bairro: ${form.neighborhood.trim()}`
    )

    if (form.complement.trim()) {
      lines.push(`Complemento: ${form.complement.trim()}`)
    }

    if (form.reference.trim()) {
      lines.push(`Referência: ${form.reference.trim()}`)
    }
  }

  lines.push("", "*HORÁRIO DESEJADO*", schedule)
  lines.push("", "*FORMA DE PAGAMENTO*", paymentMethod)

  if (form.paymentMethod === "cash" && form.changeFor.trim()) {
    lines.push(`Troco para: ${form.changeFor.trim()}`)
  }

  lines.push("", "*ITENS DO PEDIDO*")

  items.forEach((item) => {
    lines.push(`- ${item.quantity}x ${item.name} — ${formatCurrency(item.unitPrice * item.quantity)}`)
  })

  lines.push(
    "",
    "*SUBTOTAL ESTIMADO*",
    formatCurrency(subtotal),
    "",
    "*OBSERVAÇÕES*",
    form.notes.trim() || "Nenhuma",
    "",
    "Observação: o subtotal é estimado. Produtos por peso, preços e disponibilidade serão confirmados pelo atendimento.",
    "",
    "Aguardo a confirmação do pedido e eventuais ajustes de disponibilidade ou valor final."
  )

  return lines.join("\n")
}

export function buildWhatsAppOrderUrl(message: string) {
  return `https://wa.me/${orderConfig.whatsappDeliveryNumber}?text=${encodeURIComponent(message)}`
}
