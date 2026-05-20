"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { PointerEvent, WheelEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroBanners } from "@/src/constants"
import type { Banner } from "@/src/types"

interface HeroBannerProps {
  banners?: Banner[]
}

const AUTOPLAY_DELAY = 6500
const AUTOPLAY_RESUME_DELAY = 5000
const MIN_DRAG_DISTANCE = 48
const MAX_DRAG_DISTANCE = 120
const DRAG_DISTANCE_RATIO = 0.14
const WHEEL_SWIPE_DISTANCE = 85
const WHEEL_GESTURE_DELAY = 180
const BANNER_IMAGE_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
} as const

const getDragThreshold = (width: number) =>
  Math.min(MAX_DRAG_DISTANCE, Math.max(MIN_DRAG_DISTANCE, width * DRAG_DISTANCE_RATIO))

const capturePointer = (element: HTMLDivElement, pointerId: number) => {
  try {
    element.setPointerCapture(pointerId)
    return true
  } catch {
    return false
  }
}

const releasePointer = (element: HTMLDivElement, pointerId: number) => {
  if (element.hasPointerCapture(pointerId)) {
    element.releasePointerCapture(pointerId)
  }
}

export function HeroBanner({ banners = heroBanners }: HeroBannerProps) {
  const imageBanners = useMemo(
    () => banners.filter((banner): banner is Banner & { image: string } => Boolean(banner.image)),
    [banners]
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const autoplayResumeTimeoutRef = useRef<number | null>(null)
  const wheelGestureTimeoutRef = useRef<number | null>(null)
  const wheelDistanceRef = useRef(0)
  const dragStateRef = useRef({
    pointerId: null as number | null,
    pointerType: "",
    startX: 0,
    startY: 0,
    currentX: 0,
    hasCaptured: false,
    hasHorizontalIntent: false,
  })
  const hasMultipleBanners = imageBanners.length > 1

  const pauseAutoplayTemporarily = useCallback(() => {
    if (!hasMultipleBanners) return

    setIsAutoplayPaused(true)

    if (autoplayResumeTimeoutRef.current) {
      window.clearTimeout(autoplayResumeTimeoutRef.current)
    }

    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoplayPaused(false)
      autoplayResumeTimeoutRef.current = null
    }, AUTOPLAY_RESUME_DELAY)
  }, [hasMultipleBanners])

  const goToSlide = useCallback(
    (nextIndex: number) => {
      if (!imageBanners.length) return

      setDirection(nextIndex >= currentIndex ? 1 : -1)
      setCurrentIndex((nextIndex + imageBanners.length) % imageBanners.length)
    },
    [currentIndex, imageBanners.length]
  )

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((index) => (index - 1 + imageBanners.length) % imageBanners.length)
  }, [imageBanners.length])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((index) => (index + 1) % imageBanners.length)
  }, [imageBanners.length])

  const getSlidePosition = useCallback(
    (index: number) => {
      if (index === currentIndex) return 0

      const previousIndex = (currentIndex - 1 + imageBanners.length) % imageBanners.length
      const nextIndex = (currentIndex + 1) % imageBanners.length

      if (index === previousIndex && index === nextIndex) {
        return dragOffset > 0 || direction < 0 ? -1 : 1
      }

      if (index === previousIndex) return -1
      if (index === nextIndex) return 1

      return index > currentIndex ? 2 : -2
    },
    [currentIndex, direction, dragOffset, imageBanners.length]
  )

  const finishDrag = useCallback(
    (offset: number) => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0
      const dragThreshold = getDragThreshold(viewportWidth)

      setIsDragging(false)
      setDragOffset(0)

      if (Math.abs(offset) < dragThreshold) return

      if (offset < 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    },
    [goToNext, goToPrevious]
  )

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!hasMultipleBanners || !event.isPrimary) return
      if (event.pointerType === "mouse" && event.button !== 0) return

      pauseAutoplayTemporarily()

      dragStateRef.current = {
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        startX: event.clientX,
        startY: event.clientY,
        currentX: event.clientX,
        hasCaptured: false,
        hasHorizontalIntent: event.pointerType === "mouse",
      }

      if (event.pointerType === "mouse") {
        dragStateRef.current.hasCaptured = capturePointer(event.currentTarget, event.pointerId)
      }

      setIsDragging(true)
      setDragOffset(0)
    },
    [hasMultipleBanners, pauseAutoplayTemporarily]
  )

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current

    if (dragState.pointerId !== event.pointerId) return

    const nextOffset = event.clientX - dragState.startX
    const verticalOffset = event.clientY - dragState.startY
    const absHorizontalOffset = Math.abs(nextOffset)
    const absVerticalOffset = Math.abs(verticalOffset)

    dragState.currentX = event.clientX

    if (!dragState.hasHorizontalIntent) {
      if (absVerticalOffset > absHorizontalOffset && absVerticalOffset > 10) return
      if (absHorizontalOffset < 4) return

      dragState.hasHorizontalIntent = true
      dragState.hasCaptured = capturePointer(event.currentTarget, event.pointerId)
    }

    event.preventDefault()
    setDragOffset(nextOffset)
  }, [])

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current

      if (dragState.pointerId !== event.pointerId) return

      if (dragState.hasCaptured) {
        releasePointer(event.currentTarget, event.pointerId)
      }

      dragStateRef.current.pointerId = null
      finishDrag(dragState.currentX - dragState.startX)
    },
    [finishDrag]
  )

  const handlePointerCancel = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current

    if (dragState.pointerId !== event.pointerId) return

    if (dragState.hasCaptured) {
      releasePointer(event.currentTarget, event.pointerId)
    }

    dragStateRef.current.pointerId = null
    setIsDragging(false)
    setDragOffset(0)
  }, [])

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!hasMultipleBanners) return

      const horizontalDelta = event.deltaX

      if (Math.abs(horizontalDelta) <= Math.abs(event.deltaY)) return

      event.preventDefault()
      pauseAutoplayTemporarily()

      if (wheelGestureTimeoutRef.current) {
        window.clearTimeout(wheelGestureTimeoutRef.current)
      }

      wheelDistanceRef.current += horizontalDelta

      if (Math.abs(wheelDistanceRef.current) >= WHEEL_SWIPE_DISTANCE) {
        if (wheelDistanceRef.current > 0) {
          goToNext()
        } else {
          goToPrevious()
        }

        wheelDistanceRef.current = 0
      }

      wheelGestureTimeoutRef.current = window.setTimeout(() => {
        wheelDistanceRef.current = 0
        wheelGestureTimeoutRef.current = null
      }, WHEEL_GESTURE_DELAY)
    },
    [goToNext, goToPrevious, hasMultipleBanners, pauseAutoplayTemporarily]
  )

  useEffect(() => {
    if (currentIndex <= imageBanners.length - 1) return

    setCurrentIndex(0)
  }, [currentIndex, imageBanners.length])

  useEffect(() => {
    if (!hasMultipleBanners || isAutoplayPaused) return

    const interval = window.setInterval(goToNext, AUTOPLAY_DELAY)

    return () => window.clearInterval(interval)
  }, [goToNext, hasMultipleBanners, isAutoplayPaused])

  useEffect(() => {
    return () => {
      if (autoplayResumeTimeoutRef.current) {
        window.clearTimeout(autoplayResumeTimeoutRef.current)
      }

      if (wheelGestureTimeoutRef.current) {
        window.clearTimeout(wheelGestureTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!imageBanners.length) return

    const preloadIndexes = new Set([
      currentIndex,
      (currentIndex + 1) % imageBanners.length,
      (currentIndex - 1 + imageBanners.length) % imageBanners.length,
    ])

    preloadIndexes.forEach((index) => {
      const preloadImage = new window.Image()
      preloadImage.src = imageBanners[index].image
    })
  }, [currentIndex, imageBanners])

  if (!imageBanners.length) return null

  return (
    <section className="relative py-3 sm:py-4 lg:py-6" aria-label="Banner principal">
      <div className="relative mx-auto w-full max-w-[1560px] px-3 sm:px-5 lg:px-8 xl:px-10">
        <div
          ref={viewportRef}
          className={`relative overflow-hidden rounded-2xl bg-[#102410] shadow-[0_18px_45px_rgba(31,41,55,0.08)] select-none touch-pan-y ${
            hasMultipleBanners ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
          style={{ height: "clamp(190px, 28vw, 450px)" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onWheel={handleWheel}
        >
          {imageBanners.map((banner, index) => {
            const isActive = index === currentIndex
            const slidePosition = getSlidePosition(index)
            const isNearbySlide = Math.abs(slidePosition) <= 1

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 bg-[#102410] will-change-transform ${
                  isDragging ? "" : "transition-transform duration-[650ms] ease-out"
                } ${isNearbySlide ? "opacity-100" : "opacity-0"} ${isActive ? "z-10" : "z-0"}`}
                style={{
                  transform: `translate3d(calc(${slidePosition * 100}% + ${dragOffset}px), 0, 0)`,
                }}
                aria-hidden={!isActive}
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                  sizes="(min-width: 1600px) 1480px, (min-width: 1024px) calc(100vw - 80px), calc(100vw - 24px)"
                  draggable={false}
                  style={{
                    ...BANNER_IMAGE_STYLE,
                    objectPosition: banner.imagePosition ?? "center",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )
          })}
        </div>

        {hasMultipleBanners && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card/80 shadow-lg transition-colors hover:bg-card sm:left-7 lg:left-10 xl:left-12"
              aria-label="Banner anterior"
              onClick={() => {
                pauseAutoplayTemporarily()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-card/80 shadow-lg transition-colors hover:bg-card sm:right-7 lg:right-10 xl:right-12"
              aria-label="Proximo banner"
              onClick={() => {
                pauseAutoplayTemporarily()
                goToNext()
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div
              className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6"
              role="tablist"
              aria-label="Indicadores de banner"
            >
              {imageBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-card" : "w-2.5 bg-card/55 hover:bg-card/80"
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Banner ${index + 1}`}
                  onClick={() => {
                    pauseAutoplayTemporarily()
                    goToSlide(index)
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
