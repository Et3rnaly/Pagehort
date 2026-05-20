"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartSheet, getCartItemCount, useCartStore } from "@/src/features/cart"

export function FloatingCart() {
  const items = useCartStore((state) => state.items)
  const itemCount = getCartItemCount(items)
  const badgeText = itemCount > 99 ? "99+" : String(itemCount)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <CartSheet>
        <Button
          className="relative h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:bg-primary/90"
          aria-label={`Abrir carrinho de compras com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-background bg-accent px-1.5 text-xs font-bold text-accent-foreground">
            {badgeText}
          </span>
        </Button>
      </CartSheet>
    </div>
  )
}
