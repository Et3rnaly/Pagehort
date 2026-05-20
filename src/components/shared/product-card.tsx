"use client"

import { Heart } from "lucide-react"
import { AddToCartButton } from "@/src/features/cart"
import type { Product } from "@/src/types"

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact" | "diet"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "compact") {
    return (
      <div className="min-w-[180px] bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
          <span className="text-5xl">{product.image}</span>
        </div>
        <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-primary">{product.priceUnit}</p>
        <AddToCartButton
          product={product}
          size="sm"
          className="mt-3 w-full rounded-full"
        />
      </div>
    )
  }

  if (variant === "diet") {
    return (
      <div className="min-w-[180px] bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow">
        <div className="relative">
          {product.tag && (
            <span className="absolute top-0 left-0 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {product.tag}
            </span>
          )}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3 pt-6">
            <span className="text-5xl">{product.image}</span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-primary">{product.priceUnit}</p>
        <AddToCartButton
          product={product}
          size="sm"
          className="mt-3 w-full rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-w-[200px] max-w-[200px] bg-card rounded-xl border border-border p-4 group">
      {/* Product Image */}
      <div className="relative mb-3">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          <span className="text-6xl">{product.image}</span>
        </div>
        
        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            Novidade!
          </span>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="w-8 h-8 bg-card rounded-full shadow flex items-center justify-center hover:bg-muted"
            aria-label="Adicionar à lista de desejos"
          >
            <Heart className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2 h-10">
        {product.name}
      </h3>

      {/* Pricing */}
      <div className="space-y-1">
        {product.pricePerKgOld && (
          <p className="text-xs text-muted-foreground line-through">
            {product.pricePerKgOld}
          </p>
        )}
        {product.pricePerKg && (
          <p className="text-sm text-foreground">
            {product.pricePerKg}
          </p>
        )}
        <p className="inline-block bg-primary text-primary-foreground font-bold px-3 py-1 rounded text-sm">
          {product.priceUnit}
        </p>
        {product.discount && (
          <span className="ml-2 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {product.unitInfo}
        </p>
      </div>

      {/* Add to Cart */}
      <AddToCartButton product={product} className="mt-3 w-full rounded-full" />
    </div>
  )
}
