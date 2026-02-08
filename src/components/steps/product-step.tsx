"use client"

import type { OrderData } from "@/src/components/order-form"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { NativeSelect, NativeSelectOption } from "@/src/components/ui/native-select"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { products } from "@/src/lib/pricing-data"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"

type ProductStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

export function ProductStep({ orderData, updateOrderData }: ProductStepProps) {
  const isMobile = useIsMobile()
  const [openSleeveModal, setOpenSleeveModal] = useState(false)
  const [tempSleeve, setTempSleeve] = useState<string | undefined>(undefined)

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    const defaultSleeve = product?.sleeveVariants?.[0]?.id || undefined
    const hasVariants = (product?.sleeveVariants?.length || 0) > 1
    updateOrderData({ product: productId, productCategory: product?.category || "", additionals: [] })
    if (hasVariants) {
      setTempSleeve(defaultSleeve)
      setOpenSleeveModal(true)
    } else {
      updateOrderData({ sleeveVariant: defaultSleeve })
    }
  }

  const handleSleeveChange = (sleeveId: string) => {
    setTempSleeve(sleeveId)
  }

  const selectedProduct = products.find((p) => p.id === orderData.product)

  useEffect(() => {
    if (selectedProduct?.sleeveVariants && selectedProduct.sleeveVariants.length === 1 && !orderData.sleeveVariant) {
      updateOrderData({ sleeveVariant: selectedProduct.sleeveVariants[0].id })
    }
  }, [selectedProduct?.id])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Escolha o Produto</h2>
      <p className="text-muted-foreground mb-6">Selecione o tipo de peca que deseja estampar</p>

      <div className={isMobile ? "space-y-3" : "grid grid-cols-2 md:grid-cols-3 gap-4"}>
        {products.map((product) => {
          const isSelected = orderData.product === product.id
          return (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all hover:shadow-md border border-border overflow-hidden rounded-md ${isSelected ? "ring-2 ring-primary" : ""} ${
                isMobile ? "flex items-center gap-4 p-4" : "py-0"
              }`}
              onClick={() => handleProductSelect(product.id)}
            >
              {isMobile ? (
                <>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md shrink-0"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                  </div>
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative h-40">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-medium text-sm">{product.name}</p>
                  </div>
                </>
              )}
            </Card>
          )
        })}
      </div>

      <Dialog open={openSleeveModal} onOpenChange={setOpenSleeveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar tipo de manga</DialogTitle>
          </DialogHeader>
          {selectedProduct?.sleeveVariants && (
            <NativeSelect
              value={tempSleeve || selectedProduct.sleeveVariants[0].id}
              onChange={(e) => handleSleeveChange(e.currentTarget.value)}
            >
              {selectedProduct.sleeveVariants.map((sleeve) => (
                <NativeSelectOption key={sleeve.id} value={sleeve.id}>
                  {sleeve.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSleeveModal(false)}>Cancelar</Button>
            <Button
              onClick={() => {
                updateOrderData({ sleeveVariant: tempSleeve || selectedProduct?.sleeveVariants?.[0]?.id })
                setOpenSleeveModal(false)
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
