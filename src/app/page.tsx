 "use client"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Bolt, ClipboardCheck, Hash, Layers, Palette, PlusCircle, Ruler, Truck, User } from "lucide-react"
import Link from "next/link"

function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.currentTarget
  const data = new FormData(form)
  const name = String(data.get("name") || "").trim()
  const email = String(data.get("email") || "").trim()
  const phone = String(data.get("phone") || "").trim()
  const message = String(data.get("message") || "").trim()
  const statusEl = form.querySelector("#form-status") as HTMLElement | null
  if (!name || !email || !phone || !message) {
    if (statusEl) { statusEl.textContent = "Preencha todos os campos obrigatórios."; statusEl.className = "mt-2 text-destructive" }
    return
  }
  const text = encodeURIComponent(`Olá, sou ${name}. Email: ${email}, Tel: ${phone}. Mensagem: ${message}`)
  const url = `https://wa.me/558188511896?text=${text}`
  window.open(url, "_blank", "noopener")
  if (statusEl) { statusEl.textContent = "Redirecionando para WhatsApp..."; statusEl.className = "mt-2 text-emerald-400" }
  form.reset()
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative h-dvh min-h-dvh overflow-hidden">
        <picture>
          <source
            media="(min-width:1024px)"
            srcSet="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1600&q=70"
            type="image/jpeg"
          />
          <source
            media="(min-width:768px)"
            srcSet="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1200&q=70"
            type="image/jpeg"
          />
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=70"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4">
            <div
              className="max-w-2xl"
              data-animate="fade-up"
            >
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                Estampando <span className="text-primary">camisetas</span> e fazendo história
              </h1>
              <p className="text-white/80 mt-4 text-lg">
                Moda que expressa o que você acredita. Transformamos suas ideias em peças únicas com alta qualidade.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/pedido">
                  <Button className="transition-transform duration-300 hover:-translate-y-0.5">Fazer Orçamento</Button>
                </Link>
                <a href="https://wa.me/558188511896" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="transition-transform duration-300 hover:-translate-y-0.5">WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12" data-animate="fade-up">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Destaques</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border border-border text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <Bolt className="h-6 w-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Orçamento Rápido</h3>
            <p className="text-muted-foreground mt-2">Configure seu pedido online com clareza de preços.</p>
          </Card>
          <Card className="p-6 border border-border text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <Palette className="h-6 w-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Arte Própria ou Criação</h3>
            <p className="text-muted-foreground mt-2">Envie sua arte ou peça criação com nossa equipe.</p>
          </Card>
          <Card className="p-6 border border-border text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Entrega em Todo Brasil</h3>
            <p className="text-muted-foreground mt-2">Simule seu frete e acompanhe os prazos.</p>
          </Card>
        </div>
      </section>

      <section className="bg-muted py-12" data-animate="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Produtos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <h3 className="text-lg font-semibold">Camisas Adulto</h3>
              <p className="text-muted-foreground mt-2">Modelos Básica e Raglan</p>
              <p className="text-primary font-semibold mt-3">A partir de R$30,00</p>
            </Card>
            <Card className="p-6 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <h3 className="text-lg font-semibold">Camisas Infantil</h3>
              <p className="text-muted-foreground mt-2">Modelos Básica</p>
              <p className="text-primary font-semibold mt-3">A partir de R$26,00</p>
            </Card>
            <Card className="p-6 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <h3 className="text-lg font-semibold">Vestidos</h3>
              <p className="text-muted-foreground mt-2">Reto e Babado</p>
              <p className="text-primary font-semibold mt-3">A partir de R$60,00</p>
            </Card>
          </div>
          <div className="mt-8">
            <Link href="/pedido">
              <Button className="transition-transform duration-300 hover:-translate-y-0.5">Ver opções e fazer pedido</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12" data-animate="fade-up">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Passo a Passo</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">1</span>
              <Hash className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Escolha o produto</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Camisa Básica, Raglan ou Vestidos.</p>
          </Card>
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">2</span>
              <Ruler className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Quantidades e tamanhos</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Distribua entre PP–XGG e infantil.</p>
          </Card>
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">3</span>
              <Layers className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Escolha a malha</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Algodão Fio 30.1 e opções.</p>
          </Card>
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">4</span>
              <PlusCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Adicionais e arte</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Adicionais e arte própria ou criação.</p>
          </Card>
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">5</span>
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Dados e entrega</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Contato e endereço para logística.</p>
          </Card>
          <Card className="p-5 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">6</span>
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Revisão e envio</h3>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Revise e gere o orçamento.</p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12" data-animate="fade-up">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Contato</h2>
        <form className="max-w-3xl bg-card border border-border rounded-xl p-6" onSubmit={handleContactSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Nome</span>
              <input name="name" required className="h-10 rounded-md border border-input bg-background px-3" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">E-mail</span>
              <input type="email" name="email" required className="h-10 rounded-md border border-input bg-background px-3" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Telefone</span>
              <input type="tel" name="phone" required className="h-10 rounded-md border border-input bg-background px-3" />
            </label>
            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Mensagem</span>
              <textarea name="message" rows={4} required className="rounded-md border border-input bg-background px-3 py-2" />
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" className="transition-transform duration-300 hover:-translate-y-0.5">Enviar</Button>
            <a href="https://taplink.cc/simuleseufreteadonai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="transition-transform duration-300 hover:-translate-y-0.5">Simular frete</Button>
            </a>
          </div>
          <p id="form-status" className="mt-2 text-muted-foreground"></p>
        </form>
      </section>

      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Adonai Estampas · Recife-PE</p>
          <div className="mt-3">
            <a href="https://wa.me/558188511896" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              WhatsApp: (81) 8851-1896
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
