"use client"

import type { OrderData } from "@/src/components/order-form"
import { Card } from "@/src/components/ui/card"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { Check } from "lucide-react"
import { useEffect } from "react"

type FabricStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

const fabrics = [
  {
    id: "algodao",
    name: "Algodão",
    description: "100% algodão, confortável e respirável",
    image: "/cotton-fabric-texture.jpg",
  },
]

export function FabricStep({ orderData, updateOrderData }: FabricStepProps) {
  const isMobile = useIsMobile()
  useEffect(() => {
    if (!orderData.fabric && fabrics.length === 1) {
      updateOrderData({ fabric: fabrics[0].id })
    }
  }, [])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Tipo de Malha</h2>
      <p className="text-muted-foreground mb-6">Selecione o tipo de tecido para suas peças</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fabrics.map((fabric) => {
          const isSelected = orderData.fabric === fabric.id
          return (
            <Card
              key={fabric.id}
              className={`cursor-pointer transition-all hover:shadow-md border border-border overflow-hidden rounded-md ${isSelected ? "ring-2 ring-primary" : ""}`}
              onClick={() => updateOrderData({ fabric: fabric.id })}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">{fabric.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{fabric.description}</p>
                </div>
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
