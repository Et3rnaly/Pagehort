"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { Product } from "@/src/types"
import { parseBrazilianCurrency } from "./cart-utils"
import type { CartItem } from "./types"

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  increaseItem: (productId: number) => void
  decreaseItem: (productId: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

const CART_STORAGE_KEY = "ze-das-frutas-cart"

function createCartItem(product: Product): CartItem {
  return {
    productId: product.id,
    name: product.name,
    priceUnit: product.priceUnit,
    unitInfo: product.unitInfo,
    image: product.image,
    unitPrice: parseBrazilianCurrency(product.priceUnit),
    quantity: 1,
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, createCartItem(product)],
          }
        }),
      increaseItem: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
