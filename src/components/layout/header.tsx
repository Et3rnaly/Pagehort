"use client"

import { useState } from "react"
import { Search, Heart, MapPin, User, ShoppingCart, Menu, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mainNavLinks } from "@/src/config/navigation"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { CartSheet, getCartItemCount, useCartStore } from "@/src/features/cart"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const cartItemCount = getCartItemCount(cartItems)
  const cartBadgeText = cartItemCount > 99 ? "99+" : String(cartItemCount)
  const wideContainer = "mx-auto w-full max-w-[1560px] px-3 sm:px-5 lg:px-8 xl:px-10"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 rounded-b-[28px] bg-[#fffefa] shadow-[0_12px_28px_rgba(31,41,55,0.07)]",
        className
      )}
    >
      {/* Top Bar */}
      <div className={`${wideContainer} py-4 lg:py-5`}>
        <div className="flex items-center justify-between gap-5 lg:gap-8 xl:gap-10">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-black/5 bg-[#f7f7f2] text-foreground shadow-none hover:bg-white lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Logo */}
          <a href="/" className="mr-8 flex shrink-0 items-center gap-3 lg:mr-12 xl:mr-16">
            <Image
              src="/logo.png"
              alt="Logo da marca"
              width={72}
              height={72}
              className="h-12 w-12 rounded-full object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              priority
            />
            <div className="hidden min-w-0 sm:block">
              <span className="text-xl font-bold leading-tight text-primary lg:text-2xl">{siteConfig.name}</span>
              <p className="text-xs text-muted-foreground">{siteConfig.tagline}</p>
            </div>
          </a>

          {/* Search Bar */}
          <div className="mr-2 hidden flex-1 md:flex lg:mr-5 xl:mr-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Digite seu produto"
                className="h-12 w-full rounded-full border border-black/10 bg-[#f8f8f5] pl-6 pr-12 text-base shadow-none transition-colors placeholder:text-muted-foreground/80 hover:border-primary/20 hover:bg-white focus-visible:border-primary/25 focus-visible:ring-2 focus-visible:ring-primary/15 lg:h-[52px]"
                aria-label="Buscar produtos"
              />
              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2.5 lg:gap-3 xl:gap-4">
            <a
              href="/listas"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-black/5 bg-[#f8f8f5] px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-white xl:flex"
            >
              <Heart className="h-[18px] w-[18px]" />
              <span>Listas de compras</span>
              <ChevronDown className="h-4 w-4 text-primary/70" />
            </a>

            <button
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-black/5 bg-[#f8f8f5] px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-white xl:flex"
              aria-label="Adicionar localização"
            >
              <MapPin className="h-[18px] w-[18px]" />
              <span>Adicionar localização</span>
              <ChevronDown className="h-4 w-4 text-primary/70" />
            </button>

            <button
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-black/5 bg-[#f8f8f5] px-3.5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-white lg:px-4"
              aria-label="Conta do usuário"
            >
              <User className="h-[18px] w-[18px]" />
              <span className="hidden lg:inline">Bem-vindo(a)</span>
            </button>

            <CartSheet>
              <button
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f8f5] text-primary transition-colors hover:bg-white lg:h-12 lg:w-12"
                aria-label={`Carrinho de compras com ${cartItemCount} ${cartItemCount === 1 ? "item" : "itens"}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                  {cartBadgeText}
                </span>
              </button>
            </CartSheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="search"
              placeholder="Digite seu produto"
              className="h-12 w-full rounded-full border border-black/10 bg-[#f8f8f5] pl-5 pr-11 shadow-none hover:bg-white focus-visible:border-primary/25 focus-visible:ring-2 focus-visible:ring-primary/15"
              aria-label="Buscar produtos"
            />
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav aria-label="Navegação principal">
        <div className={wideContainer}>
          <div className="scrollbar-hide flex items-center gap-4 overflow-x-auto pb-5 pt-1 lg:gap-5">
            <Button className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-green-950/20 bg-primary px-5 text-primary-foreground shadow-none transition-colors hover:bg-primary/90 lg:px-6">
              <span>Compre por departamento</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <div className="hidden h-8 w-px shrink-0 bg-black/10 sm:block" aria-hidden="true" />

            {mainNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 hover:text-primary lg:px-3"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-[#fffefa] shadow-[0_16px_28px_rgba(31,41,55,0.08)] lg:hidden">
          <div className={`${wideContainer} py-4`}>
            <nav className="flex flex-col gap-2" aria-label="Menu mobile">
              {mainNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-primary transition-colors hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
