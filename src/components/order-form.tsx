"use client"

import { OrderSummary } from "@/src/components/order-summary"
import { AdditionalsStep } from "@/src/components/steps/additionals-step"
import { ArtworkStep } from "@/src/components/steps/artwork-step"
import { CustomerInfoStep } from "@/src/components/steps/customer-info-step"
import { FabricStep } from "@/src/components/steps/fabric-step"
import { ProductStep } from "@/src/components/steps/product-step"
import { QuantityStep } from "@/src/components/steps/quantity-step"
import { ReviewStep } from "@/src/components/steps/review-step"
import { SizesStep } from "@/src/components/steps/sizes-step"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { useMobile } from "@/src/hooks/use-mobile"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { useState } from "react"

export type OrderData = {
  product?: string
  productCategory?: string
  sleeveVariant?: string
  quantity?: string
  sizes: Record<string, number>
  fabric?: string
  additionals: string[]
  hasArtwork?: boolean
  artworkDetails?: {
    shirtColor: string
    printColors: string
    front: string
    back: string
    details: string
    logos: string
    inspiration: string
  }
  customerInfo?: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

const initialOrderData: OrderData = {
  sizes: {},
  additionals: [],
  sleeveVariant: undefined,
}

export function OrderForm() {
  const [step, setStep] = useState(1)
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData)
  const isMobile = useMobile()

  const totalSteps = 8

  const updateOrderData = (data: Partial<OrderData>) => {
    setOrderData((prev) => ({ ...prev, ...data }))
  }

  const handleReset = () => {
    setOrderData({ ...initialOrderData, sizes: {}, additionals: [] })
    setStep(1)
  }

  const handleResetWithConfirm = () => {
    if (confirm("Tem certeza que deseja resetar todo o formulario?")) {
      handleReset()
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!orderData.product
      case 2:
        return !!orderData.quantity
      case 3:
        {
          const total = Object.values(orderData.sizes).reduce((a, b) => a + b, 0)
          if (!orderData.quantity) return total > 0
          const ranges = [
            { id: "10-29", min: 10, max: 29 },
            { id: "30-49", min: 30, max: 49 },
            { id: "50-99", min: 50, max: 99 },
            { id: "100-199", min: 100, max: Number.POSITIVE_INFINITY },
          ]
          const r = ranges.find(x => x.id === orderData.quantity)
          const min = r?.min ?? 0
          return total >= min
        }
      case 4:
        return !!orderData.fabric
      case 5:
        return true // Additionals are optional
      case 6:
        return orderData.hasArtwork !== undefined
      case 7:
        return !!(orderData.customerInfo?.name && orderData.customerInfo?.phone && orderData.customerInfo?.city)
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ProductStep orderData={orderData} updateOrderData={updateOrderData} />
      case 2:
        return <QuantityStep orderData={orderData} updateOrderData={updateOrderData} />
      case 3:
        return <SizesStep orderData={orderData} updateOrderData={updateOrderData} />
      case 4:
        return <FabricStep orderData={orderData} updateOrderData={updateOrderData} />
      case 5:
        return <AdditionalsStep orderData={orderData} updateOrderData={updateOrderData} />
      case 6:
        return <ArtworkStep orderData={orderData} updateOrderData={updateOrderData} />
      case 7:
        return <CustomerInfoStep orderData={orderData} updateOrderData={updateOrderData} />
      case 8:
        return <ReviewStep orderData={orderData} onReset={handleReset} onBack={handlePrevious} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <div className="bg-secondary py-2 lg:py-3 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <img src="/images/logo.png" alt="Adonai Estampas" className="h-8 lg:h-12 object-contain" />
          </div>
        </div>
      </div> */}

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className={step === 8 ? "max-w-4xl mx-auto" : "grid lg:grid-cols-3 gap-6 lg:h-[calc(100vh-8rem)]"}>
            <div className={step === 8 ? "" : "lg:col-span-2 lg:flex lg:flex-col"}>
              <div className="mb-4">
                <h1 className="text-lg lg:text-xl font-bold text-foreground text-center mb-2">
                  Configure seu pedido personalizado
                </h1>
              </div>

              <Card className="p-4 lg:p-6 lg:flex-1 lg:flex lg:flex-col lg:overflow-hidden">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">
                      Etapa {step} de {totalSteps}
                    </span>
                    <span className="text-sm text-muted-foreground">{Math.round((step / totalSteps) * 100)}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="lg:flex-1 lg:overflow-y-auto lg:pr-2 mb-20 lg:mb-0">{renderStep()}</div>

                {step < 8 && (
                  <div className="fixed lg:relative bottom-0 left-0 right-0 bg-card p-4 lg:p-0 shadow-lg lg:shadow-none z-30 border-t lg:border-t-0 lg:mt-6 lg:pt-6 lg:border-t">
                    <div className="container mx-auto px-4 lg:px-0 flex items-center justify-between">
                      <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Anterior
                      </Button>
                      <Button onClick={handleNext} disabled={!canProceed()}>
                        Proxima
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {step !== 8 && (
              <div className="hidden lg:block lg:overflow-hidden">
                <div className="h-full">
                  <OrderSummary orderData={orderData} currentStep={step} onReset={handleResetWithConfirm} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            {step < 8 && (
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      size="icon"
                      className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-xl z-50 bg-primary hover:bg-primary/90"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <span className="sr-only">Ver resumo do pedido</span>
                    </Button>
                  }
                />
                <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                  <OrderSummary orderData={orderData} currentStep={step} onReset={handleResetWithConfirm} />
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
