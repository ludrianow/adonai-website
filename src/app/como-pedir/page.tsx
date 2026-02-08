 "use client"

 import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { ClipboardCheckIcon, HashIcon, LayersIcon, MapPinIcon, PaletteIcon, PlusCircleIcon, RulerIcon, ShirtIcon, UserIcon } from "lucide-react"
import Link from "next/link"

 export default function ComoPedirPage() {
  const steps = [
    { id: 1, title: "Escolha o produto", icon: ShirtIcon, desc: "Camisa Básica, Raglan ou Vestidos; selecione a variante." },
    { id: 2, title: "Defina a quantidade", icon: HashIcon, desc: "Selecione a faixa de unidades do pedido." },
    { id: 3, title: "Informe os tamanhos", icon: RulerIcon, desc: "Distribua a quantidade entre PP–XGG e infantil." },
    { id: 4, title: "Escolha a malha", icon: LayersIcon, desc: "Algodão Fio 30.1 penteado ou opções disponíveis." },
    { id: 5, title: "Selecione adicionais", icon: PlusCircleIcon, desc: "Etiqueta, cores, mangas e ajustes de estampa." },
    { id: 6, title: "Arte própria ou criação", icon: PaletteIcon, desc: "Envie sua arte ou descreva para criarmos." },
    { id: 7, title: "Dados e entrega", icon: UserIcon, desc: "Preencha contato e endereço para orçamento e logística." },
    { id: 8, title: "Revisão e envio", icon: ClipboardCheckIcon, desc: "Revise todo o pedido e gere o orçamento." },
  ]

   return (
     <main className="min-h-screen bg-background">
       <section className="container mx-auto px-4 py-10">
         <div className="grid md:grid-cols-2 gap-8 items-center">
           <div>
             <h1 className="text-3xl md:text-4xl font-bold leading-tight">
               <span className="text-foreground">PASSO A PASSO</span>
               <br />
               <span className="text-muted-foreground">para fazer o seu</span>{" "}
               <span className="text-primary">pedido</span>
             </h1>
             <div className="mt-8 grid sm:grid-cols-2 gap-4">
               {steps.map((s) => (
                 <Card key={s.id} className="p-4 border border-border">
                   <div className="flex items-center gap-3">
                     <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold">
                       {s.id}
                     </span>
                     <s.icon className="text-primary h-5 w-5" />
                     <h3 className="font-semibold">{s.title}</h3>
                   </div>
                   <p className="text-muted-foreground mt-1 text-sm">{s.desc}</p>
                 </Card>
               ))}
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <img src="/images/camisa-raglan.jpeg" alt="Modelo Raglan" className="w-full h-48 object-cover rounded-md" />
             <img src="/images/camisa-basica.jpeg" alt="Modelo Básica" className="w-full h-48 object-cover rounded-md" />
             <img src="/images/vestido-basico.jpeg" alt="Vestido Reto" className="w-full h-48 object-cover rounded-md" />
             <img src="/images/vestido-babado.jpeg" alt="Vestido Babado" className="w-full h-48 object-cover rounded-md" />
           </div>
         </div>
         <div className="mt-8">
           <Link href="/pedido">
             <Button className="w-full md:w-auto">Não perca tempo. Faça já o seu orçamento!</Button>
           </Link>
         </div>
       </section>

       <section className="bg-secondary py-10">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-8 items-center">
             <div>
               <h2 className="text-xl font-semibold text-foreground">Dúvidas e Informações</h2>
               <p className="text-muted-foreground mt-2">
                 Em caso de dúvidas, entre em contato conosco através do nosso WhatsApp.
               </p>
               <div className="mt-4 flex gap-3">
                 <a href="https://wa.me/558188511896" target="_blank" rel="noopener noreferrer">
                   <Button variant="outline">WhatsApp</Button>
                 </a>
                 <a href="https://taplink.cc/simuleseufreteadonai" target="_blank" rel="noopener noreferrer">
                   <Button variant="outline">Simular frete</Button>
                 </a>
               </div>
             </div>
             <div>
               <ul className="space-y-2 text-sm">
                 <li>
                   <Link className="text-primary underline" href="/portfolio">Portfólio</Link>
                 </li>
                 <li>
                   <Link className="text-primary underline" href="/pedido">Faça seu orçamento</Link>
                 </li>
                <li className="flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-foreground" />
                  <span className="text-muted-foreground">Recife - PE</span>
                </li>
               </ul>
             </div>
           </div>
         </div>
       </section>
     </main>
   )
 }
