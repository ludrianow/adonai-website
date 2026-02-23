 "use client"
import { Inter } from "next/font/google"
import React, { useEffect, useState } from "react"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

// export const metadata: Metadata = {
//   title: "Adonai Estampas - Pedido Personalizado",
//   description: "Configure seu pedido de estamparia personalizada com a Adonai Estampas",
//     generator: 'v0.app'
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-90", "translate-y-0")
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    )
    for (const el of elements) {
      el.classList.add("opacity-0", "translate-y-3", "transition-all", "duration-500", "will-change-transform")
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return (
    <html lang="pt-BR" className={fontSans.variable}>
      <body className="antialiased bg-background text-muted-background">
        <header
          className={[
            "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
            scrolled ? "bg-secondary shadow-sm" : "bg-foreground/95"
          ].join(" ")}
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Adonai Estampas" className="h-12 object-contain transition-transform duration-300" />
            </div>
          </div>
        </header>

        <main className="min-h-screen pt-16">{children}</main>

        <footer className="bg-transparent py-3 text-muted-foreground">
          <div className="container mx-auto px-4">
            <div className="py-3 text-center text-sm">
              © 2026 Adonai Estampas. Todos os direitos reservados.
            </div>
          </div>
        </footer>

        <a
          href="https://wa.me/558188048443"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-7 right-8 z-50 bg-primary/70 text-primary-foreground hover:bg-primary/90 rounded-full h-14 w-14 flex items-center justify-center shadow-xl"
          aria-label="WhatsApp"
        >
          <img src="/images/logo.png" alt="" className="h-11 w-11 object-contain" />
        </a>
      </body>
    </html>
  )
}
