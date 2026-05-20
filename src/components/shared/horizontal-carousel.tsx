"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HorizontalCarouselProps {
  children: React.ReactNode
  showNavigation?: boolean
  className?: string
  itemsClassName?: string
}

export function HorizontalCarousel({
  children,
  showNavigation = true,
  className,
  itemsClassName,
}: HorizontalCarouselProps) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex gap-4 overflow-x-auto pb-4 scrollbar-hide",
        itemsClassName
      )}>
        {children}
      </div>

      {showNavigation && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-card shadow-lg rounded-full hidden md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card shadow-lg rounded-full hidden md:flex"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  )
}
