"use client"

import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export type ImageItem = {
  src: string
  nome: string
  categoria: string
}

export type PortfolioGroup = {
  name: string
  items: ImageItem[]
}

interface PortfolioClientProps {
  groups: PortfolioGroup[]
  allCategories: string[]
  currentCategory: string
  currentQuery: string
}

export default function PortfolioClient({
  groups,
  allCategories,
  currentCategory,
  currentQuery,
}: PortfolioClientProps) {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCat, setSelectedCat] = useState(currentCategory || "Todos")

  // Flatten items for easier navigation
  const displayedGroups = useMemo(() => {
    if (selectedCat === "Todos") return groups
    return groups.filter((g) => g.name === selectedCat)
  }, [groups, selectedCat])
  const allItems = useMemo(() => {
    return displayedGroups.flatMap((g) => g.items)
  }, [displayedGroups])

  // Refs for focus management
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Open Lightbox
  const openLightbox = (item: ImageItem) => {
    const index = allItems.findIndex((i) => i.src === item.src)
    if (index !== -1) {
      previousFocusRef.current = document.activeElement as HTMLElement
      setCurrentImageIndex(index)
      setLightboxOpen(true)
      setClosing(false)
    }
  }

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setLightboxOpen(false)
      setClosing(false)
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }, 200)
  }, [])

  // Navigation
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allItems.length)
  }, [allItems.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allItems.length) % allItems.length)
  }, [allItems.length])

  // Keyboard Support
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        nextImage()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevImage()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    // Lock body scroll
    document.body.style.overflow = "hidden"

    // Focus management
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 50)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, closeLightbox, nextImage, prevImage])

  // Preload adjacent images
  useEffect(() => {
    if (lightboxOpen && allItems.length > 1) {
      const nextIdx = (currentImageIndex + 1) % allItems.length
      const prevIdx = (currentImageIndex - 1 + allItems.length) % allItems.length
      const imgNext = new Image()
      const imgPrev = new Image()
      imgNext.src = allItems[nextIdx].src
      imgPrev.src = allItems[prevIdx].src
    }
  }, [currentImageIndex, lightboxOpen, allItems])


  // Lazy image with IntersectionObserver
  function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [loadedSrc, setLoadedSrc] = useState<string>("")
    const ref = useRef<HTMLImageElement | null>(null)
    useEffect(() => {
      const el = ref.current
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setLoadedSrc(src)
              io.disconnect()
              break
            }
          }
        },
        { rootMargin: "200px" }
      )
      io.observe(el)
      return () => io.disconnect()
    }, [src])
    return (
      <img
        ref={ref}
        loading="lazy"
        decoding="async"
        src={loadedSrc || ""}
        alt={alt}
        className={className}
      />
    )
  }

  // Touch gestures for mobile navigation
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextImage()
      else prevImage()
    }
    touchStartX.current = null
  }

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <form method="get" className="flex items-center gap-3">
            <Input name="q" placeholder="Buscar por nome..." defaultValue={currentQuery} className="w-64" />
            <input type="hidden" name="cat" value={selectedCat} />
            <Button type="submit">Buscar</Button>
          </form>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCat === "Todos" ? "outline" : "ghost"}
              aria-pressed={selectedCat === "Todos"}
              onClick={() => setSelectedCat("Todos")}
            >
              Todos
            </Button>
            {allCategories.map((c) => (
              <Button
                key={c}
                variant={selectedCat === c ? "outline" : "ghost"}
                aria-pressed={selectedCat === c}
                onClick={() => setSelectedCat(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        {displayedGroups.map((group) => (
          <div key={group.name} className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">{group.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <Card
                  key={item.src}
                  className="p-4 border border-border group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-muted/50"
                  onClick={() => openLightbox(item)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openLightbox(item)
                    }
                  }}
                  role="button"
                  aria-label={`Ver detalhes de ${item.nome}`}
                >
                  <div className="relative w-full overflow-hidden rounded-md bg-muted h-80">
                    <div className="h-[70%] w-full">
                      <LazyImage
                        src={item.src}
                        alt={`${item.categoria} · ${item.nome}`}
                        className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105 group-hover:opacity-70 will-change-transform"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{item.nome}</h3>
                    <p className="text-muted-foreground text-sm">{item.categoria}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {displayedGroups.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum item encontrado.
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className={["fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity", closing ? "animate-out fade-out duration-200" : "animate-in fade-in duration-300"].join(" ")}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[1010] p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Fechar visualização"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 z-[1010] p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary hidden md:block"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 z-[1010] p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary hidden md:block"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Content Container */}
          <div
            className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full h-full flex items-center justify-center">
               <img
                  src={allItems[currentImageIndex].src}
                  alt={allItems[currentImageIndex].nome}
                  className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
                  decoding="sync"
                />
            </div>

            <div className="mt-4 text-center">
              <h2 id="lightbox-title" className="text-xl font-bold text-white">
                {allItems[currentImageIndex].nome}
              </h2>
              <p className="text-white/80 text-sm">
                {allItems[currentImageIndex].categoria} ({currentImageIndex + 1} de {allItems.length})
              </p>
              <div aria-live="polite" className="sr-only">
                Visualizando {allItems[currentImageIndex].nome} em {allItems[currentImageIndex].categoria}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
