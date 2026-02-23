"use client"

import type { OrderData } from "@/src/components/order-form"
import { Button } from "@/src/components/ui/button"
import { additionals, calculateTotal, formatPrice, getProductById } from "@/src/lib/pricing-data"
import { AlertTriangle, CheckCircle2, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewStepProps {
  orderData: OrderData
  onReset: () => void
  onBack: () => void
}

const fabricLabels: Record<string, string> = {
  algodao: "Algodao Fio 30.1 penteado",
}

const quantityLabels: Record<string, string> = {
  "10-29": "Entre 10 e 29",
  "30-49": "Entre 30 e 49",
  "50-99": "Entre 50 e 99",
  "100+": "100 ou mais",
}

export function ReviewStep({ orderData, onReset, onBack }: ReviewStepProps) {
  const product = getProductById(orderData.product || "")
  const router = useRouter()

  const formatSizes = () => {
    const sizesWithQuantity = Object.entries(orderData.sizes)
      .filter(([_, qty]) => qty > 0)
      .map(([size, qty]) => `${size}: ${qty}`)
    return sizesWithQuantity.join(", ")
  }

  const getSleeveVariantName = () => {
    if (!product?.sleeveVariants || !orderData.sleeveVariant) return null
    const sleeve = product.sleeveVariants.find(s => s.id === orderData.sleeveVariant)
    return sleeve?.name || null
  }

  const totalQuantity = Object.values(orderData.sizes).reduce((a, b) => a + b, 0)
  const pricing = calculateTotal(
    orderData.product || "",
    orderData.additionals,
    totalQuantity,
    orderData.sleeveVariant
  )

  const variantPricings = (orderData.additionals || []).map((addId) => {
    const variant = calculateTotal(orderData.product || "", [addId], totalQuantity, orderData.sleeveVariant)
    const addInfo = additionals.find(a => a.id === addId)
    return {
      id: addId,
      name: addInfo?.name || addId,
      unit: variant.totalUnit,
      total: variant.total,
    }
  })

  const getSelectedAdditionals = () => {
    return orderData.additionals.map(addId => {
      const add = additionals.find(a => a.id === addId)
      return add ? { name: add.name, price: add.price } : null
    }).filter(Boolean)
  }

  const handleSubmit = () => {
    let message = `*PEDIDO ADONAI ESTAMPAS*\n\n`

    // Dados do Cliente
    message += `*DADOS DO CLIENTE:*\n`
    message += `Nome: ${orderData.customerInfo?.name || "-"}\n`
    message += `Telefone: ${orderData.customerInfo?.phone || "-"}\n`
    message += `Email: ${orderData.customerInfo?.email || "-"}\n`
    message += `Endereco: ${orderData.customerInfo?.address || "-"}\n`
    message += `Cidade: ${orderData.customerInfo?.city || "-"}\n`
    message += `Estado: ${orderData.customerInfo?.state || "-"}\n`
    message += `CEP: ${orderData.customerInfo?.zipCode || "-"}\n\n`

    // Detalhes do Produto
    message += `*DETALHES DO PRODUTO:*\n`
    message += `Modelo: ${product?.name || orderData.product}\n`

    const sleeveVariantName = getSleeveVariantName()
    if (sleeveVariantName) {
      message += `Tipo de Manga: ${sleeveVariantName}\n`
    }

    message += `Malha: ${fabricLabels[orderData.fabric || ""] || orderData.fabric}\n\n`

    // Quantidade e Tamanhos
    message += `*QUANTIDADE E TAMANHOS:*\n`
    message += `Faixa de quantidade: ${quantityLabels[orderData.quantity || ""] || orderData.quantity}\n`
    message += `Total de pecas: ${totalQuantity} unidades\n`
    message += `Tamanhos: ${formatSizes()}\n\n`

    // Adicionais
    const selectedAdds = getSelectedAdditionals()
    if (selectedAdds.length > 0) {
      message += `*ADICIONAIS SELECIONADOS:*\n`
      selectedAdds.forEach((add: any) => {
        if (add) {
          const priceStr = typeof add.price === "number" ? formatPrice(add.price) : "Sob consulta"
          message += `- ${add.name} (${priceStr})\n`
        }
      })
      message += `\n`
    } else {
      message += `*ADICIONAIS:* Nenhum adicional selecionado\n\n`
    }

    // Arte
    message += `*ARTE:*\n`
    if (orderData.hasArtwork === true) {
      message += `Cliente possui arte propria (PDF/CDR/PSD)\n\n`
    } else if (orderData.hasArtwork === false && orderData.artworkDetails) {
      message += `Solicitar criacao de arte pela equipe Adonai\n`
      message += `Cor da camisa: ${orderData.artworkDetails.shirtColor || "-"}\n`
      message += `Cores da estampa: ${orderData.artworkDetails.printColors || "-"}\n`
      message += `Frente: ${orderData.artworkDetails.front || "-"}\n`
      message += `Costas: ${orderData.artworkDetails.back || "-"}\n`
      message += `Detalhes localizados: ${orderData.artworkDetails.details || "-"}\n`
      message += `Logomarcas: ${orderData.artworkDetails.logos || "-"}\n`
      message += `Inspiracao: ${orderData.artworkDetails.inspiration || "-"}\n\n`
    }

    // Calculo do Orcamento
    message += `*CALCULO DO ORCAMENTO:*\n`
    message += `Preco base do produto: ${formatPrice(pricing.unitPrice)}\n`
    if (pricing.sleevePrice > 0) {
      message += `Adicional tipo manga: ${formatPrice(pricing.sleevePrice)}\n`
    }
    if (pricing.additionalsPrice > 0) {
      message += `Total de adicionais: ${formatPrice(pricing.additionalsPrice)}\n`
    }
    message += `Preco unitario final: ${formatPrice(pricing.totalUnit)}\n`
    message += `Quantidade: ${totalQuantity} unidades\n`
    message += `\n*TOTAL ESTIMADO: ${formatPrice(pricing.total)}*\n`
    if (variantPricings.length > 0) {
      message += `\n*VARIACOES POR ADICIONAL:*\n`
      variantPricings.forEach(v => {
        message += `- ${v.name}: unitario ${formatPrice(v.unit)} | total ${formatPrice(v.total)}\n`
      })
    }

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/558188048443?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    try {
      onReset()
    } finally {
      router.push("/")
    }
  }

  const selectedAdditionals = getSelectedAdditionals()
  const sleeveVariantName = getSleeveVariantName()

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-center text-[#00d9a3] mb-1">Resumo do pedido</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">Confira os detalhes do seu pedido</p>

          <div className="bg-muted/50 rounded-lg p-4 space-y-3 text-sm">
            <div>
              <span className="font-semibold text-foreground">Modelo:</span>{" "}
              <span className="text-muted-foreground">{product?.name || orderData.product}</span>
            </div>

            {sleeveVariantName && (
              <div>
                <span className="font-semibold text-foreground">Tipo de Manga:</span>{" "}
                <span className="text-muted-foreground">{sleeveVariantName}</span>
              </div>
            )}

            <div>
              <span className="font-semibold text-foreground">Malha:</span>{" "}
              <span className="text-muted-foreground">{fabricLabels[orderData.fabric || ""] || orderData.fabric}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Faixa de quantidade:</span>{" "}
              <span className="text-muted-foreground">{quantityLabels[orderData.quantity || ""] || orderData.quantity}</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Total de pecas:</span>{" "}
              <span className="text-muted-foreground">{totalQuantity} unidades</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">Tamanhos:</span>{" "}
              <span className="text-muted-foreground">{formatSizes()}</span>
            </div>

            {selectedAdditionals.length > 0 && (
              <div>
                <span className="font-semibold text-foreground">Adicionais:</span>
                <div className="mt-1 space-y-1">
                  {selectedAdditionals.map((add: any, index) => {
                    if (!add) return null
                    const priceStr = typeof add.price === "number" ? formatPrice(add.price) : "Sob consulta"
                    return (
                      <div key={index} className="text-muted-foreground pl-2">
                        - {add.name} (+{priceStr})
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {orderData.hasArtwork !== undefined && (
              <div>
                <span className="font-semibold text-foreground">Arte:</span>{" "}
                <span className="text-muted-foreground">
                  {orderData.hasArtwork ? "Cliente possui arte propria" : "Solicitar criacao de arte"}
                </span>
              </div>
            )}

            {orderData.customerInfo?.name && (
              <div className="pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Cliente:</span>{" "}
                <span className="text-muted-foreground">{orderData.customerInfo.name}</span>
                {orderData.customerInfo.phone && (
                  <span className="text-muted-foreground"> - Tel: {orderData.customerInfo.phone}</span>
                )}
                {orderData.customerInfo.city && (
                  <div className="text-muted-foreground">{orderData.customerInfo.city}/{orderData.customerInfo.state}</div>
                )}
              </div>
            )}

            {/* Calculo do total */}
            <div className="pt-3 border-t border-border bg-primary/5 -mx-4 px-4 py-3 rounded-b-lg mt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Preco base do produto:</span>
                  <span>{formatPrice(pricing.unitPrice)}</span>
                </div>
                {pricing.quantityDiscount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Desconto por quantidade:</span>
                    <span>-{formatPrice(pricing.quantityDiscount)}</span>
                  </div>
                )}
                {pricing.sleevePrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Adicional tipo manga ({sleeveVariantName}):</span>
                    <span>+{formatPrice(pricing.sleevePrice)}</span>
                  </div>
                )}
                {pricing.additionalsPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Adicionais:</span>
                    <span>+{formatPrice(pricing.additionalsPrice)}</span>
                  </div>
                )}
                {orderData.additionals.some(id => additionals.find(a => a.id === id)?.price === "consulta") && (
                  <div className="text-xs text-muted-foreground">
                    Algum adicional esta SOB CONSULTA. O valor estimado considera apenas o preco base.
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold border-t border-border pt-2">
                  <span>Preco unitario:</span>
                  <span>{formatPrice(pricing.totalUnit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantidade:</span>
                  <span>{totalQuantity} unidades</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-2 mt-2">
                  <span>TOTAL ESTIMADO:</span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
                {variantPricings.length > 0 && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-semibold mb-1">Variacoes por adicional:</p>
                    <div className="space-y-1">
                      {variantPricings.map(v => (
                        <div key={v.id} className="flex justify-between text-sm">
                          <span>{v.name}</span>
                          <span className="font-semibold">
                            {formatPrice(v.unit)} / {formatPrice(v.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-2 text-[#00d9a3]">
            <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Otimo! Seu orcamento esta pronto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Agora e so clicar no botao <strong>"Fechar o pedido"</strong> para garantir as condicoes atuais.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Voce sera redirecionado para o nosso WhatsApp, onde vamos definir os detalhes finais como pagamento e prazos de entrega. Mas atencao: alguns valores e prazos podem mudar em breve, entao aproveite enquanto esta tudo fresquinho!
              </p>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-destructive">Este e um orcamento preliminar baseado nas suas preferencias atuais.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  O valor final pode variar dependendo de ajustes necessarios, como a quantidade exata de camisetas, o tipo de estampa e outros detalhes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 bg-transparent"
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button
            className="flex-1 h-12 bg-[#00d9a3] hover:bg-[#00c594] text-white font-semibold"
            onClick={handleSubmit}
          >
            Finalizar
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-8">
          2025 Adonai Estampas. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
