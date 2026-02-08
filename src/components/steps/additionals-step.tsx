"use client"

import type { OrderData } from "@/src/components/order-form"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Card } from "@/src/components/ui/card"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Label } from "@/src/components/ui/label"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { calculateTotal, formatPrice, getAdditionalsForProduct, getProductById } from "@/src/lib/pricing-data"
import { Info } from "lucide-react"
import { useEffect, useState } from "react"

type AdditionalsStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

export function AdditionalsStep({ orderData, updateOrderData }: AdditionalsStepProps) {
  const isMobile = useIsMobile()
  const quantityNum = orderData.quantity ? Number.parseInt(orderData.quantity.split("-")[0]) : 0
  const canSelectAdditionals = quantityNum >= 30

  const product = getProductById(orderData.product || "")
  const availableAdditionals = getAdditionalsForProduct(orderData.product || "")
  const [noAdditionals, setNoAdditionals] = useState(false)

  const handleToggle = (value: string) => {
    let newAdditionals = [...orderData.additionals]

    if (newAdditionals.includes(value)) {
      newAdditionals = newAdditionals.filter((item) => item !== value)
    } else {
      newAdditionals.push(value)
    }

    updateOrderData({ additionals: newAdditionals })
    if (newAdditionals.length > 0 && noAdditionals) {
      setNoAdditionals(false)
    }
  }

  useEffect(() => {
    if (availableAdditionals.length === 1 && canSelectAdditionals && orderData.additionals.length === 0 && !noAdditionals) {
      updateOrderData({ additionals: [availableAdditionals[0].id] })
    }
  }, [orderData.product])

  const handleNoAdditionals = () => {
    setNoAdditionals((prev) => {
      const next = !prev
      if (next) {
        updateOrderData({ additionals: [] })
      }
      return next
    })
  }

  // Calculate current total
  const totalQuantity = Object.values(orderData.sizes).reduce((a, b) => a + b, 0) || quantityNum
  const pricing = calculateTotal(orderData.product || "", orderData.additionals, totalQuantity)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Adicionais</h2>
      <p className="text-muted-foreground mb-4">Selecione opcoes adicionais para personalizar suas pecas</p>

      {product && (
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm">
            <span className="font-semibold">Produto selecionado:</span> {product.name}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Preco base:</span> {formatPrice(product.basePrice)} por unidade
          </p>
          {orderData.additionals.length > 0 && (
            <p className="text-sm text-primary font-semibold mt-2">
              Preco com adicionais: {formatPrice(pricing.totalUnit)} por unidade
            </p>
          )}
        </div>
      )}

      {!canSelectAdditionals && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Adicionais estao disponiveis apenas para pedidos a partir de 30 unidades. Voce pode continuar sem adicionais
            ou voltar e ajustar a quantidade.
          </AlertDescription>
        </Alert>
      )}

      {availableAdditionals.length === 0 ? (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Nao ha adicionais disponiveis para o produto selecionado. Voce pode continuar para a proxima etapa.
          </AlertDescription>
        </Alert>
      ) : (
        <div className={isMobile ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${noAdditionals ? "ring-2 ring-primary bg-primary/5" : ""}`}
            onClick={handleNoAdditionals}
          >
            <div className="flex items-center gap-4">
              <img
                src={"/assets/no-additional-icon.jpg"}
                alt={"Nao desejo adicionais"}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <Checkbox id="no-additionals" checked={noAdditionals} onCheckedChange={handleNoAdditionals} className="mt-1" />
                  <Label htmlFor="no-additionals" className="text-sm font-medium leading-tight cursor-pointer">
                    Nao desejo adicionais
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Selecione se nao quer adicionar nenhuma personalizacao extra</p>
              </div>
            </div>
          </Card>
          {availableAdditionals.map((additional) => {
            const isDisabled = !canSelectAdditionals
            const isSelected = orderData.additionals.includes(additional.id) && !noAdditionals
            const priceDisplay = typeof additional.price === "number"
              ? `+${formatPrice(additional.price)}`
              : "Sob consulta"

            return (
              <Card
                key={additional.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-md border border-border overflow-hidden rounded-md ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                } ${isDisabled || noAdditionals ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !isDisabled && !noAdditionals && handleToggle(additional.id)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={additional.image || "/placeholder.svg"}
                    alt={additional.name}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={additional.id}
                        checked={isSelected}
                        disabled={isDisabled || noAdditionals}
                        onCheckedChange={() => !isDisabled && !noAdditionals && handleToggle(additional.id)}
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor={additional.id}
                          className={`text-sm font-medium leading-tight block ${
                            isDisabled || noAdditionals ? "cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          {additional.name}
                        </Label>
                        <span className={`text-sm font-semibold ${typeof additional.price === "number" ? "text-primary" : "text-muted-foreground"}`}>
                          {priceDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {orderData.additionals.length > 0 && (
        <div className="mt-6 bg-primary/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Resumo dos adicionais:</h3>
          <ul className="space-y-1 text-sm">
            {orderData.additionals.map((addId) => {
              const add = availableAdditionals.find(a => a.id === addId)
              if (!add) return null
              return (
                <li key={addId} className="flex justify-between">
                  <span>{add.name}</span>
                  <span className="font-semibold">
                    {typeof add.price === "number" ? `+${formatPrice(add.price)}` : "Sob consulta"}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-primary/20 mt-3 pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total por unidade:</span>
              <span className="text-primary">{formatPrice(pricing.totalUnit)}</span>
            </div>
            {totalQuantity > 0 && (
              <div className="flex justify-between font-semibold mt-1">
                <span>Total estimado ({totalQuantity} unidades):</span>
                <span className="text-primary">{formatPrice(pricing.total)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
