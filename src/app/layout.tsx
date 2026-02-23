 "use client"
import { Button } from "@/src/components/ui/button"
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon } from "lucide-react"
import { Inter } from "next/font/google"
import Link from "next/link"
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
              {/* <span className="text-background font-semibold">Adonai Estampas</span> */}
            </div>
            <nav className="hidden md:flex items-center gap-6 transition-opacity duration-300">
              <Link href="/" className={["text-sm transition-colors", scrolled ? "text-background hover:text-primary" : "text-white hover:text-primary"].join(" ")}>Início</Link>
              <Link href="/informacoes" className={["text-sm transition-colors", scrolled ? "text-background hover:text-primary" : "text-white hover:text-primary"].join(" ")}>Informações</Link>
              <Link href="/como-pedir" className={["text-sm transition-colors", scrolled ? "text-background hover:text-primary" : "text-white hover:text-primary"].join(" ")}>Como pedir</Link>
              <Link href="/portfolio" className={["text-sm transition-colors", scrolled ? "text-background hover:text-primary" : "text-white hover:text-primary"].join(" ")}>Portfólio</Link>
            </nav>
            <div className="flex items-center gap-3 transition-transform duration-300">
              <Link href="https://orcamento.adonaiestampas.com">
                <Button className="transition-transform duration-300 hover:-translate-y-0.5">Faça seu orçamento</Button>
              </Link>
              <a href="https://taplink.cc/simuleseufreteadonai" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="transition-transform duration-300 hover:-translate-y-0.5">Calcule seu frete</Button>
              </a>
            </div>
          </div>
        </header>

        <main className="min-h-screen pt-16">{children}</main>

        <footer className="bg-secondary py-10 text-muted-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <img src="/images/logo.png" alt="Adonai Estampas" className="h-20 object-contain transition-transform duration-300" />
                <div className="h-0.5 w-28 bg-primary my-2" />
                <p className="mt-3">
                  Empresa pernambucana líder em camisas de malha 100% algodão, garantindo conforto e qualidade. Atendemos igrejas, escolas, empresas e eventos.

                  Com mais de 8 anos de experiência, conquistamos a confiança de milhares de clientes no Brasil e no Exterior.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="https://www.instagram.com/adonaiestampas/" aria-label="Instagram" className="bg-background/30 text-foreground hover:bg-primary hover:text-muted border border-border rounded-full h-9 w-9 flex items-center justify-center">
                    <InstagramIcon className="size-5" />
                  </a>
                  <a href="https://www.facebook.com/adonaiestampas/" aria-label="Facebook" className="bg-background/30 text-foreground hover:bg-primary hover:text-muted border border-border rounded-full h-9 w-9 flex items-center justify-center">
                    <FacebookIcon className="size-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-muted font-semibold text-lg">Links Rápidos</h3>
                <div className="h-0.5 w-20 bg-primary my-2" />
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-primary">Início</Link></li>
                  <li><Link href="/como-pedir" className="hover:text-primary">Como Pedir</Link></li>
                  <li><Link href="/portfolio" className="hover:text-primary">Portfólio</Link></li>
                  <li><Link href="https://teste-orcamento.adonaiestampas.com" className="hover:text-primary">Fazer Orçamento</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-muted font-semibold text-lg">Contato</h3>
                <div className="h-0.5 w-20 bg-primary my-2" />
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <PhoneIcon className="size-5 text-muted-foreground" />
                    <span>(81) 98804-8443</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MailIcon className="size-5 text-muted-foreground" />
                    <span>adonaiestampas@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-4 text-center text-sm">
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
