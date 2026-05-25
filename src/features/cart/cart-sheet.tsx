"use client"

import { useMemo, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { isRemoteImageSource } from "@/src/lib/images"
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  formatCurrency,
  getCartItemCount,
  getCartSubtotal,
} from "./cart-utils"
import { useCartStore } from "./cart-store"
import type {
  CartItem,
  CheckoutFormData,
  CheckoutFormErrors,
  OrderType,
  PaymentMethod,
  ScheduleMode,
} from "./types"

interface CartSheetProps {
  children: ReactNode
}

type CartStep = "cart" | "checkout"

const INITIAL_CHECKOUT_FORM: CheckoutFormData = {
  customerName: "",
  phone: "",
  orderType: "",
  address: "",
  number: "",
  neighborhood: "",
  complement: "",
  reference: "",
  scheduleMode: "asap",
  scheduledTime: "",
  paymentMethod: "",
  changeFor: "",
  notes: "",
}

export function CartSheet({ children }: CartSheetProps) {
  const items = useCartStore((state) => state.items)
  const increaseItem = useCartStore((state) => state.increaseItem)
  const decreaseItem = useCartStore((state) => state.decreaseItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const replaceItems = useCartStore((state) => state.replaceItems)
  const clearCart = useCartStore((state) => state.clearCart)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<CartStep>("cart")

  const subtotal = useMemo(() => getCartSubtotal(items), [items])
  const itemCount = useMemo(() => getCartItemCount(items), [items])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setStep("cart")
    }
  }

  const handleOrderStarted = () => {
    clearCart()
    setStep("cart")
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-l-2xl border-l border-border bg-[#fffefa] p-0 sm:max-w-[460px]">
        {step === "cart" ? (
          <CartReviewStep
            items={items}
            itemCount={itemCount}
            subtotal={subtotal}
            onContinueShopping={() => setOpen(false)}
            onCheckout={() => setStep("checkout")}
            onIncrease={increaseItem}
            onDecrease={decreaseItem}
            onRemove={removeItem}
          />
        ) : (
          <CheckoutStep
            items={items}
            subtotal={subtotal}
            onBack={() => setStep("cart")}
            onReplaceItems={replaceItems}
            onOrderStarted={handleOrderStarted}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartReviewStep({
  items,
  itemCount,
  subtotal,
  onContinueShopping,
  onCheckout,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  items: CartItem[]
  itemCount: number
  subtotal: number
  onContinueShopping: () => void
  onCheckout: () => void
  onIncrease: (productId: CartItem["productId"]) => void
  onDecrease: (productId: CartItem["productId"]) => void
  onRemove: (productId: CartItem["productId"]) => void
}) {
  const hasItems = items.length > 0

  return (
    <>
      <SheetHeader className="border-b border-border px-5 py-5 pr-12">
        <SheetTitle className="text-xl text-primary">Carrinho</SheetTitle>
        <SheetDescription>
          {hasItems
            ? `${itemCount} ${itemCount === 1 ? "item" : "itens"} no pedido`
            : "Seu pedido começa aqui."}
        </SheetDescription>
      </SheetHeader>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {hasItems ? (
          <div className="space-y-3">
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>
        ) : (
          <EmptyCart onContinueShopping={onContinueShopping} />
        )}
      </div>

      {hasItems && (
        <SheetFooter className="border-t border-border bg-[#fffefa] px-5 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">Subtotal estimado</span>
              <strong className="text-xl text-primary">{formatCurrency(subtotal)}</strong>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Produtos por peso, preços e disponibilidade serão confirmados pelo atendimento.
            </p>
          </div>
          <Button className="h-11 rounded-full text-base" onClick={onCheckout}>
            <MessageCircle className="h-5 w-5" />
            Finalizar pedido pelo WhatsApp
          </Button>
        </SheetFooter>
      )}
    </>
  )
}

function EmptyCart({ onContinueShopping }: { onContinueShopping: () => void }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ShoppingBasket className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">Seu carrinho está vazio</h3>
        <p className="max-w-[260px] text-sm text-muted-foreground">
          Escolha frutas, verduras e praticidades fresquinhas para montar seu pedido.
        </p>
      </div>
      <Button className="rounded-full" onClick={onContinueShopping}>
        Continuar comprando
      </Button>
    </div>
  )
}

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem
  onIncrease: (productId: CartItem["productId"]) => void
  onDecrease: (productId: CartItem["productId"]) => void
  onRemove: (productId: CartItem["productId"]) => void
}) {
  return (
    <article className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted text-3xl">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={56}
              height={56}
              sizes="56px"
              className="h-full w-full rounded-lg object-cover"
              loading="lazy"
              unoptimized={isRemoteImageSource(item.imageUrl)}
            />
          ) : (
            item.image
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.unitInfo}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.productId)}
              aria-label={`Remover ${item.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Unitário</p>
              <p className="text-sm font-semibold text-primary">{item.priceUnit}</p>
            </div>

            <div className="flex items-center rounded-full border border-border bg-background p-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 rounded-full"
                onClick={() => onDecrease(item.productId)}
                aria-label={`Diminuir quantidade de ${item.name}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 rounded-full"
                onClick={() => onIncrease(item.productId)}
                aria-label={`Aumentar quantidade de ${item.name}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
            <span className="text-xs text-muted-foreground">Subtotal</span>
            <strong className="text-sm text-foreground">
              {formatCurrency(item.unitPrice * item.quantity)}
            </strong>
          </div>
        </div>
      </div>
    </article>
  )
}

function CheckoutStep({
  items,
  subtotal,
  onBack,
  onReplaceItems,
  onOrderStarted,
}: {
  items: CartItem[]
  subtotal: number
  onBack: () => void
  onReplaceItems: (items: CartItem[]) => void
  onOrderStarted: () => void
}) {
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_CHECKOUT_FORM)
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = <Field extends keyof CheckoutFormData>(
    field: Field,
    value: CheckoutFormData[Field]
  ) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!items.length) {
      onBack()
      return
    }

    const nextErrors = validateCheckoutForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    const currentItems = await refreshCartItems(items)

    if (currentItems.length === 0) {
      onReplaceItems([])
      setIsSubmitting(false)
      onBack()
      return
    }

    onReplaceItems(currentItems)

    const message = buildWhatsAppOrderMessage(form, currentItems)
    const url = buildWhatsAppOrderUrl(message)

    window.open(url, "_blank", "noopener,noreferrer")
    setIsSubmitting(false)
    onOrderStarted()
  }

  return (
    <>
      <SheetHeader className="border-b border-border px-5 py-5 pr-12">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full"
            onClick={onBack}
            aria-label="Voltar para o carrinho"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <SheetTitle className="text-xl text-primary">Finalizar pedido</SheetTitle>
            <SheetDescription>Dados para confirmação pelo WhatsApp.</SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-6">
            <CheckoutSection title="Dados pessoais">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nome completo</Label>
                <Input
                  id="customerName"
                  value={form.customerName}
                  onChange={(event) => updateField("customerName", event.target.value)}
                  aria-invalid={Boolean(errors.customerName)}
                />
                <FieldError message={errors.customerName} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone para contato</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                <FieldError message={errors.phone} />
              </div>
            </CheckoutSection>

            <CheckoutSection title="Tipo de pedido">
              <RadioGroup
                value={form.orderType}
                onValueChange={(value) => updateField("orderType", value as OrderType)}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                <Label
                  htmlFor="order-delivery"
                  className={optionClass(form.orderType === "delivery")}
                >
                  <RadioGroupItem id="order-delivery" value="delivery" />
                  Delivery
                </Label>
                <Label htmlFor="order-pickup" className={optionClass(form.orderType === "pickup")}>
                  <RadioGroupItem id="order-pickup" value="pickup" />
                  Retirada na loja
                </Label>
              </RadioGroup>
              <FieldError message={errors.orderType} />
            </CheckoutSection>

            {form.orderType === "delivery" && (
              <CheckoutSection title="Endereço de entrega">
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço completo</Label>
                  <Input
                    id="address"
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    aria-invalid={Boolean(errors.address)}
                  />
                  <FieldError message={errors.address} />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      value={form.number}
                      onChange={(event) => updateField("number", event.target.value)}
                      aria-invalid={Boolean(errors.number)}
                    />
                    <FieldError message={errors.number} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={form.neighborhood}
                      onChange={(event) => updateField("neighborhood", event.target.value)}
                      aria-invalid={Boolean(errors.neighborhood)}
                    />
                    <FieldError message={errors.neighborhood} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={form.complement}
                    onChange={(event) => updateField("complement", event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Ponto de referência</Label>
                  <Input
                    id="reference"
                    value={form.reference}
                    onChange={(event) => updateField("reference", event.target.value)}
                  />
                </div>
              </CheckoutSection>
            )}

            <CheckoutSection title="Agendamento">
              <RadioGroup
                value={form.scheduleMode}
                onValueChange={(value) => updateField("scheduleMode", value as ScheduleMode)}
                className="grid gap-2"
              >
                <Label htmlFor="schedule-asap" className={optionClass(form.scheduleMode === "asap")}>
                  <RadioGroupItem id="schedule-asap" value="asap" />
                  O mais rápido possível
                </Label>
                <Label
                  htmlFor="schedule-custom"
                  className={optionClass(form.scheduleMode === "scheduled")}
                >
                  <RadioGroupItem id="schedule-custom" value="scheduled" />
                  Escolher horário
                </Label>
              </RadioGroup>

              {form.scheduleMode === "scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Horário desejado</Label>
                  <Input
                    id="scheduledTime"
                    value={form.scheduledTime}
                    onChange={(event) => updateField("scheduledTime", event.target.value)}
                    placeholder="Ex.: hoje entre 16h e 18h"
                    aria-invalid={Boolean(errors.scheduledTime)}
                  />
                  <FieldError message={errors.scheduledTime} />
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection title="Pagamento">
              <RadioGroup
                value={form.paymentMethod}
                onValueChange={(value) => updateField("paymentMethod", value as PaymentMethod)}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Label htmlFor="payment-pix" className={optionClass(form.paymentMethod === "pix")}>
                  <RadioGroupItem id="payment-pix" value="pix" />
                  Pix
                </Label>
                <Label
                  htmlFor="payment-cash"
                  className={optionClass(form.paymentMethod === "cash")}
                >
                  <RadioGroupItem id="payment-cash" value="cash" />
                  Dinheiro
                </Label>
                <Label htmlFor="payment-card" className={optionClass(form.paymentMethod === "card")}>
                  <RadioGroupItem id="payment-card" value="card" />
                  Cartão
                </Label>
              </RadioGroup>
              <FieldError message={errors.paymentMethod} />

              {form.paymentMethod === "cash" && (
                <div className="space-y-2">
                  <Label htmlFor="changeFor">Precisa de troco? Para quanto?</Label>
                  <Input
                    id="changeFor"
                    value={form.changeFor}
                    onChange={(event) => updateField("changeFor", event.target.value)}
                    placeholder="Ex.: R$ 100,00"
                  />
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection title="Observações">
              <Textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Ex.: escolher frutas mais maduras"
                className="min-h-24 resize-none"
                aria-label="Observações"
              />
            </CheckoutSection>
          </div>
        </div>

        <div className="border-t border-border bg-[#fffefa] px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Subtotal estimado</span>
            <strong className="text-lg text-primary">{formatCurrency(subtotal)}</strong>
          </div>
          <Button type="submit" className="h-11 w-full rounded-full text-base" disabled={isSubmitting}>
            <MessageCircle className="h-5 w-5" />
            {isSubmitting ? "Atualizando preços..." : "Abrir WhatsApp"}
          </Button>
        </div>
      </form>
    </>
  )
}

async function refreshCartItems(items: CartItem[]) {
  try {
    const response = await fetch("/api/products/current-prices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productIds: items.map((item) => item.productId),
      }),
    })

    if (!response.ok) return items

    const payload = (await response.json()) as {
      ok: boolean
      items: Array<Omit<CartItem, "quantity">>
    }

    if (!payload.ok) return items

    const currentItemsById = new Map(
      payload.items.map((item) => [String(item.productId), item])
    )

    return items
      .map((item) => {
        const currentItem = currentItemsById.get(String(item.productId))
        return currentItem ? { ...currentItem, quantity: item.quantity } : null
      })
      .filter((item): item is CartItem => item !== null)
  } catch {
    return items
  }
}

function CheckoutSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase text-primary">{title}</h3>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-xs font-medium text-destructive">{message}</p>
}

function optionClass(isSelected: boolean) {
  return cn(
    "min-h-11 cursor-pointer rounded-lg border border-border bg-card px-3 py-3 text-sm transition-colors hover:border-primary/30",
    isSelected && "border-primary bg-primary/5 text-primary"
  )
}

function validateCheckoutForm(form: CheckoutFormData) {
  const errors: CheckoutFormErrors = {}

  if (!form.customerName.trim()) {
    errors.customerName = "Informe seu nome completo."
  }

  if (!form.phone.trim()) {
    errors.phone = "Informe um telefone para contato."
  }

  if (!form.orderType) {
    errors.orderType = "Escolha entre delivery ou retirada na loja."
  }

  if (form.orderType === "delivery") {
    if (!form.address.trim()) {
      errors.address = "Informe o endereço de entrega."
    }

    if (!form.number.trim()) {
      errors.number = "Informe o número."
    }

    if (!form.neighborhood.trim()) {
      errors.neighborhood = "Informe o bairro."
    }
  }

  if (form.scheduleMode === "scheduled" && !form.scheduledTime.trim()) {
    errors.scheduledTime = "Informe o horário desejado."
  }

  if (!form.paymentMethod) {
    errors.paymentMethod = "Escolha a forma de pagamento."
  }

  return errors
}
