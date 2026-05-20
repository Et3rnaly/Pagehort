"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentProps } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Product } from "@/src/types"
import { useCartStore } from "./cart-store"

interface AddToCartButtonProps {
  product: Product
  className?: string
  label?: string
  size?: ComponentProps<typeof Button>["size"]
}

export function AddToCartButton({
  product,
  className,
  label = "Adicionar",
  size = "default",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [wasAdded, setWasAdded] = useState(false)
  const feedbackTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const handleAddToCart = () => {
    addItem(product)
    setWasAdded(true)

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current)
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setWasAdded(false)
      feedbackTimeoutRef.current = null
    }, 1400)
  }

  return (
    <Button
      type="button"
      size={size}
      className={cn("bg-primary text-primary-foreground hover:bg-primary/90", className)}
      onClick={handleAddToCart}
      aria-live="polite"
    >
      {wasAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {wasAdded ? "Adicionado" : label}
    </Button>
  )
}
