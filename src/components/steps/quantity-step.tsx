"use client"

import type { OrderData } from "@/src/components/order-form"
import { Card } from "@/src/components/ui/card"
import { Check } from "lucide-react"

type QuantityStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

const quantities = [
  { id: "10-29", label: "10 a 29 unidades" },
  { id: "30-49", label: "30 a 49 unidades" },
  { id: "50-99", label: "50 a 99 unidades" },
  { id: "100-199", label: "100 ou mais unidades" },
]

export function QuantityStep({ orderData, updateOrderData }: QuantityStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Quantidade</h2>
      <p className="text-muted-foreground mb-6">Quantas peças você deseja estampar?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quantities.map((quantity) => {
          const isSelected = orderData.quantity === quantity.id
          return (
            <Card
              key={quantity.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "ring-2 ring-primary bg-primary/5" : ""
              }`}
              onClick={() => updateOrderData({ quantity: quantity.id })}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{quantity.label}</span>
                {isSelected && (
                  <div className="bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
