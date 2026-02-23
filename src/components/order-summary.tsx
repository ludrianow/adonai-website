"use client"

import type { OrderData } from "@/src/components/order-form"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { additionals, calculateTotal, formatPrice, getProductById } from "@/src/lib/pricing-data"
import { Check, RotateCcw } from "lucide-react"

type OrderSummaryProps = {
  orderData: OrderData
  currentStep: number
  onReset?: () => void
}

export function OrderSummary({ orderData, currentStep, onReset }: OrderSummaryProps) {
  const steps = [
    { num: 1, label: "Produto", key: "product" },
    { num: 2, label: "Quantidade", key: "quantity" },
    { num: 3, label: "Tamanhos", key: "sizes" },
    { num: 4, label: "Tipo de Malha", key: "fabric" },
    { num: 5, label: "Adicionais", key: "additionals" },
    { num: 6, label: "Arte", key: "hasArtwork" },
    { num: 7, label: "Dados do Cliente", key: "customerInfo" },
  ]

  const product = getProductById(orderData.product || "")
  const totalQuantity = Object.values(orderData.sizes).reduce((a, b) => a + b, 0)
  const pricing = calculateTotal(orderData.product || "", orderData.additionals, totalQuantity || 1, orderData.sleeveVariant)

  const quantityLabels: Record<string, string> = {
    "10-29": "Entre 10 e 29",
    "30-49": "Entre 30 e 49",
    "50-99": "Entre 50 e 99",
    "100-199": "100 ou mais",
    "100+": "100 ou mais",
  }

  const getSleeveVariantName = () => {
    if (!product?.sleeveVariants || !orderData.sleeveVariant) return null
    const sleeve = product.sleeveVariants.find(s => s.id === orderData.sleeveVariant)
    return sleeve?.name || null
  }
  const sleeveVariantName = getSleeveVariantName()

  const getAdditionalLabel = (addId: string) => {
    const add = additionals.find(a => a.id === addId)
    return add?.name || addId
  }

  return (
    <Card className="p-6 border-2 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Resumo do Pedido</h2>
        {onReset && (
          <Button variant="ghost" size="icon" onClick={onReset} title="Resetar formulario">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {steps.map((stepItem) => {
          const isCompleted = stepItem.num < currentStep
          const isCurrent = stepItem.num === currentStep
          const hasData =
            stepItem.key === "product"
              ? !!orderData.product
              : stepItem.key === "quantity"
                ? !!orderData.quantity
                : stepItem.key === "sizes"
                  ? Object.values(orderData.sizes).some(v => v > 0)
                  : stepItem.key === "fabric"
                    ? !!orderData.fabric
                    : stepItem.key === "additionals"
                      ? orderData.additionals.length > 0
                      : stepItem.key === "hasArtwork"
                        ? orderData.hasArtwork !== undefined
                        : stepItem.key === "customerInfo"
                          ? !!orderData.customerInfo?.name
                          : false

          return (
            <div key={stepItem.num} className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-secondary text-secondary-foreground ring-2 ring-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepItem.num}
                </div>
                <span className={`text-sm font-semibold ${isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                  {stepItem.label}
                </span>
              </div>

              {hasData && (
                <div className="ml-9 text-sm">
                  {stepItem.key === "product" && product && (
                    <div>
                      <p className="text-foreground font-medium">{product.name}</p>
                      {sleeveVariantName && (
                        <p className="text-muted-foreground text-xs">{sleeveVariantName}</p>
                      )}
                    </div>
                  )}
                  {stepItem.key === "quantity" && orderData.quantity && (
                    <p className="text-foreground font-medium">
                      {quantityLabels[orderData.quantity] || orderData.quantity}
                    </p>
                  )}
                  {stepItem.key === "sizes" && Object.values(orderData.sizes).some(v => v > 0) && (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(orderData.sizes).map(
                        ([size, qty]) =>
                          qty > 0 && (
                            <Badge key={size} variant="secondary" className="text-xs font-semibold">
                              {size}: {qty}
                            </Badge>
                          ),
                      )}
                    </div>
                  )}
                  {stepItem.key === "fabric" && orderData.fabric && (
                    <p className="text-foreground font-medium capitalize">Algodao Fio 30.1</p>
                  )}
                  {stepItem.key === "additionals" && orderData.additionals.length > 0 && (
                    <div className="space-y-1">
                      {orderData.additionals.map((addId) => {
                        const add = additionals.find(a => a.id === addId)
                        return (
                          <div key={addId} className="flex justify-between items-center">
                            <span className="text-xs">{getAdditionalLabel(addId)}</span>
                            <span className="text-xs text-primary font-semibold">
                              {add && typeof add.price === "number" ? `+${formatPrice(add.price)}` : ""}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {stepItem.key === "hasArtwork" && orderData.hasArtwork !== undefined && (
                    <p className="text-foreground font-medium">
                      {orderData.hasArtwork ? "Tenho arte propria" : "Criacao pela equipe"}
                    </p>
                  )}
                  {stepItem.key === "customerInfo" && orderData.customerInfo?.name && (
                    <p className="text-foreground font-medium">
                      {orderData.customerInfo.name}
                    </p>
                  )}
                </div>
              )}

              {stepItem.num < steps.length && <Separator className="mt-3" />}
            </div>
          )
        })}
      </div>

      {/* Pricing Summary */}
      {orderData.product && (
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="font-semibold text-sm mb-3">Calculo do Orcamento</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preco base:</span>
              <span>{formatPrice(pricing.unitPrice)}</span>
            </div>
            {pricing.sleevePrice > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo manga:</span>
                <span>+{formatPrice(pricing.sleevePrice)}</span>
              </div>
            )}
            {pricing.additionalsPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adicionais:</span>
                <span>+{formatPrice(pricing.additionalsPrice)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Preco unitario:</span>
              <span>{formatPrice(pricing.totalUnit)}</span>
            </div>
            {totalQuantity > 0 && (
              <>
                <div className="flex justify-between text-muted-foreground">
                  <span>Quantidade:</span>
                  <span>{totalQuantity} un.</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-primary">
                  <span>TOTAL ESTIMADO:</span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
