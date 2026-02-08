"use client"

import type { OrderData } from "@/src/components/order-form"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { AlertCircle } from "lucide-react"

type SizesStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

const sizes = ["PP", "P", "M", "G", "GG", "XG", "2XG", "3XG"]

export function SizesStep({ orderData, updateOrderData }: SizesStepProps) {
  const isMobile = useIsMobile()

  const isUnlimited = orderData.quantity === "100+"

  const getMaxQuantity = () => {
    if (!orderData.quantity) return 0
    if (isUnlimited) return Number.POSITIVE_INFINITY
    const ranges: Record<string, number> = {
      "10-29": 29,
      "30-49": 49,
      "50-99": 99,
    }
    return ranges[orderData.quantity] || 0
  }

  const getTotalSelected = () => {
    return Object.values(orderData.sizes).reduce((sum, qty) => sum + qty, 0)
  }

  const handleSizeChange = (size: string, value: string) => {
    const numValue = Number.parseInt(value) || 0

    if (!isUnlimited) {
      const currentTotal = getTotalSelected() - (orderData.sizes[size] || 0)
      const maxQty = getMaxQuantity()
      const allowedValue = Math.min(numValue, maxQty - currentTotal)
      const newSizes = { ...orderData.sizes, [size]: allowedValue }
      updateOrderData({ sizes: newSizes })
    } else {
      const newSizes = { ...orderData.sizes, [size]: numValue }
      updateOrderData({ sizes: newSizes })
    }
  }

  const maxQty = getMaxQuantity()
  const totalSelected = getTotalSelected()
  const remaining = isUnlimited ? Number.POSITIVE_INFINITY : maxQty - totalSelected

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Tamanhos</h2>
      <p className="text-muted-foreground mb-6">Distribua as quantidades entre os tamanhos disponíveis</p>

      {!isUnlimited && maxQty > 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Total selecionado: <strong>{totalSelected}</strong> de <strong>{maxQty}</strong> unidades
            {remaining > 0 ? ` (${remaining} restantes)` : ""}
          </AlertDescription>
        </Alert>
      )}

      {isUnlimited && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Total selecionado: <strong>{totalSelected}</strong> unidades (sem limite)
          </AlertDescription>
        </Alert>
      )}

      <div className={isMobile ? "space-y-4" : "grid grid-cols-2 md:grid-cols-4 gap-4"}>
        {sizes.map((size) => {
          const isDisabled = !isUnlimited && remaining <= 0 && (orderData.sizes[size] || 0) === 0

          return (
            <div key={size} className={isMobile ? "flex items-center gap-4" : "space-y-2"}>
              <Label htmlFor={`size-${size}`} className={isMobile ? "font-medium w-12" : "font-medium"}>
                {size}
              </Label>
              <Input
                id={`size-${size}`}
                type="number"
                min="0"
                max={isUnlimited ? undefined : maxQty}
                value={orderData.sizes[size] || ""}
                onChange={(e) => handleSizeChange(size, e.target.value)}
                placeholder="0"
                disabled={isDisabled}
                className={isMobile ? "flex-1" : ""}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
