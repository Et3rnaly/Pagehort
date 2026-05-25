"use client"

import { useCallback, useRef, useState } from "react"
import type { PointerEvent, ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HorizontalCarouselProps {
  children: ReactNode
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
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    scrollLeft: 0,
  })

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current

    if (!scroller) return

    scroller.scrollBy({
      left: direction * Math.min(scroller.clientWidth * 0.9, 720),
      behavior: "smooth",
    })
  }, [])

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }, [])

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current

    if (dragState.pointerId !== event.pointerId) return

    event.preventDefault()
    event.currentTarget.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX)
  }, [])

  const finishPointerDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current

    if (dragState.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    dragStateRef.current.pointerId = null
    setIsDragging(false)
  }, [])

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        className={cn(
          "scrollbar-hide flex gap-4 overflow-x-auto overscroll-x-contain pb-4 scroll-smooth",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab",
          itemsClassName
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
      >
        {children}
      </div>

      {showNavigation && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-card shadow-md md:flex"
            aria-label="Anterior"
            onClick={() => scrollByPage(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-card shadow-md md:flex"
            aria-label="Proximo"
            onClick={() => scrollByPage(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  )
}
