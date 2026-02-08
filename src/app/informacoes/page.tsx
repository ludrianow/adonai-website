 "use client"

 import { Card } from "@/src/components/ui/card";

 type Medida = { tamanho: string; altura: number; largura: number }

 const adultoBabyLook: Medida[] = [
   { tamanho: "PP", altura: 52, largura: 35 },
   { tamanho: "P", altura: 56, largura: 40 },
   { tamanho: "M", altura: 61, largura: 45 },
   { tamanho: "G", altura: 67, largura: 48 },
   { tamanho: "GG", altura: 69, largura: 54 },
   { tamanho: "XG", altura: 78, largura: 60 },
   { tamanho: "XGG", altura: 83, largura: 66 },
 ]

 const adultoTradicional: Medida[] = [
   { tamanho: "PP", altura: 62, largura: 45 },
   { tamanho: "P", altura: 64, largura: 48 },
   { tamanho: "M", altura: 67, largura: 51 },
   { tamanho: "G", altura: 71, largura: 54 },
   { tamanho: "GG", altura: 73, largura: 57 },
   { tamanho: "XG", altura: 82, largura: 70 },
   { tamanho: "XGG", altura: 88, largura: 80 },
 ]

 const adultoRaglan: Medida[] = [
   { tamanho: "P", altura: 60, largura: 44 },
   { tamanho: "M", altura: 63, largura: 46 },
   { tamanho: "G", altura: 68, largura: 48 },
   { tamanho: "GG", altura: 72, largura: 53 },
   { tamanho: "XG", altura: 77, largura: 65 },
   { tamanho: "XGG", altura: 78, largura: 78 },
 ]

 const vestido: Medida[] = [
   { tamanho: "PP", altura: 87, largura: 37 },
   { tamanho: "P", altura: 92, largura: 39 },
   { tamanho: "M", altura: 97, largura: 41 },
   { tamanho: "G", altura: 101, largura: 46 },
   { tamanho: "GG", altura: 107, largura: 51 },
 ]

 const infantil: Medida[] = [
   { tamanho: "1 ano", altura: 34, largura: 27 },
   { tamanho: "2 anos", altura: 43, largura: 30 },
   { tamanho: "4 anos", altura: 45, largura: 33 },
   { tamanho: "6 anos", altura: 47, largura: 35 },
   { tamanho: "8 anos", altura: 49, largura: 38 },
   { tamanho: "10 anos", altura: 52, largura: 41 },
 ]

 type Cor = { nome: string; hex: string }

 const cores: Cor[] = [
   { nome: "Amarelo Claro", hex: "#FFF59D" },
   { nome: "Amarelo Mostarda", hex: "#D4A017" },
   { nome: "Amarelo Canário", hex: "#FFEB3B" },
   { nome: "Laranja Cenoura", hex: "#FF7043" },
   { nome: "Caramelo", hex: "#A0522D" },
   { nome: "New Wood", hex: "#8D6E63" },
   { nome: "Pão de Mel", hex: "#C68E63" },
   { nome: "Avelã", hex: "#E6C998" },
   { nome: "Marfim", hex: "#FFF5E1" },
   { nome: "Branco", hex: "#FFFFFF" },
   { nome: "Azul Marinho", hex: "#1A2E49" },
   { nome: "Preto", hex: "#000000" },
   { nome: "Cinza Chumbo", hex: "#424242" },
   { nome: "Cinza Mescla Escuro", hex: "#6D6D6D" },
   { nome: "Cinza Mescla", hex: "#9E9E9E" },
   { nome: "Turquesa", hex: "#00B8D4" },
   { nome: "Tiffany", hex: "#80E8D6" },
   { nome: "Verde Bandeira", hex: "#0F8B2C" },
   { nome: "Jade", hex: "#00A86B" },
   { nome: "Verde Oliva", hex: "#556B2F" },
   { nome: "Verde Musgo", hex: "#2F4F2F" },
   { nome: "Petróleo", hex: "#004D61" },
   { nome: "Verde Menta", hex: "#A8E6CF" },
   { nome: "Rosa Bebê", hex: "#F8BBD0" },
   { nome: "Vermelho", hex: "#D32F2F" },
   { nome: "Cereja", hex: "#C2185B" },
   { nome: "Coral", hex: "#FF6F61" },
   { nome: "Ginger", hex: "#B5651D" },
   { nome: "Vinho/Marsala", hex: "#800000" },
   { nome: "Lilás", hex: "#C2A4FF" },
   { nome: "Roxo Estelar", hex: "#7E57C2" },
   { nome: "Roxo Universe", hex: "#673AB7" },
   { nome: "Roxo Escuro", hex: "#4A148C" },
   { nome: "Azul Royal", hex: "#4169E1" },
   { nome: "Azul Anil", hex: "#3F51B5" },
   { nome: "Azul Claro", hex: "#90CAF9" },
 ]

 function Tabela({ titulo, medidas }: { titulo: string; medidas: Medida[] }) {
   return (
     <Card className="p-6 border border-border">
       <h3 className="text-lg font-semibold">{titulo}</h3>
       <div className="mt-4 overflow-x-auto">
         <table className="min-w-full text-sm">
           <thead>
             <tr className="text-left border-b border-border">
               <th className="py-2 pr-4">Tamanho</th>
               <th className="py-2 pr-4">Altura (cm)</th>
               <th className="py-2 pr-4">Largura (cm)</th>
             </tr>
           </thead>
           <tbody>
             {medidas.map((m) => (
               <tr key={m.tamanho} className="border-b border-border">
                 <td className="py-2 pr-4">{m.tamanho}</td>
                 <td className="py-2 pr-4">{m.altura}</td>
                 <td className="py-2 pr-4">{m.largura}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </Card>
   )
 }

 export default function InformacoesPage() {
   return (
     <main className="min-h-screen bg-background">
       <section className="container mx-auto px-4 py-10">
         <h1 className="text-3xl font-bold text-foreground">Tabela de Medidas</h1>
         <p className="text-muted-foreground mt-2">Adulto e infantil, com variações por modelo.</p>
       </section>

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <img src="/images/camisa-basica.jpeg" alt="Baby look" className="w-full h-40 object-cover rounded-md" />
            <p className="mt-2 text-sm text-muted-foreground">Baby look</p>
          </div>
          <div className="text-center">
            <img src="/images/camisa-basica.jpeg" alt="Tradicional" className="w-full h-40 object-cover rounded-md" />
            <p className="mt-2 text-sm text-muted-foreground">Tradicional</p>
          </div>
          <div className="text-center">
            <img src="/images/camisa-raglan.jpeg" alt="Raglan" className="w-full h-40 object-cover rounded-md" />
            <p className="mt-2 text-sm text-muted-foreground">Raglan</p>
          </div>
          <div className="text-center">
            <img src="/images/vestido-basico.jpeg" alt="Vestido" className="w-full h-40 object-cover rounded-md" />
            <p className="mt-2 text-sm text-muted-foreground">Vestido</p>
          </div>
        </div>
      </section>

       <section className="container mx-auto px-4">
         <h2 className="text-xl font-semibold text-foreground mb-4">Adulto</h2>
         <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
           <Tabela titulo="Baby look" medidas={adultoBabyLook} />
           <Tabela titulo="Tradicional" medidas={adultoTradicional} />
           <Tabela titulo="Raglan" medidas={adultoRaglan} />
           <Tabela titulo="Vestido" medidas={vestido} />
         </div>
       </section>

       <section className="container mx-auto px-4 py-10">
         <h2 className="text-xl font-semibold text-foreground mb-4">Infantil</h2>
         <Tabela titulo="Camisas Infantil" medidas={infantil} />
       </section>

       <section className="container mx-auto px-4 pb-12">
         <h2 className="text-xl font-semibold text-foreground mb-4">Opções de cores</h2>
         <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {cores.map((c) => {
             const isDark = ["#000000","#1A2E49","#424242","#6D6D6D","#004D61","#2F4F2F","#800000","#4A148C","#3F51B5"].includes(c.hex)
             return (
               <Card key={c.nome} className="p-0 border border-border overflow-hidden">
                 <div
                   className="h-16 w-full"
                   style={{ backgroundColor: c.hex }}
                 />
                 <div className={`px-3 py-2 text-xs ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
                   {c.nome.toUpperCase()}
                 </div>
               </Card>
             )
           })}
         </div>
       </section>

       {/* <section className="bg-secondary py-10">
         <div className="container mx-auto px-4 text-center">
           <p className="text-muted-foreground">Dúvidas e Informações</p>
           <div className="mt-3">
             <a href="https://wa.me/558188048443" target="_blank" rel="noopener noreferrer" className="text-primary underline">
               Fale no WhatsApp
             </a>
           </div>
         </div>
       </section> */}
     </main>
   )
 }
