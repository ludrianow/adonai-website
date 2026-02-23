"use client"

import type { OrderData } from "@/src/components/order-form"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { AlertCircle } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type SizesStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

const sizes = ["PP", "P", "M", "G", "GG", "XG", "2XG", "3XG"]

export function SizesStep({ orderData, updateOrderData }: SizesStepProps) {
  const isMobile = useIsMobile()

  const ranges = useMemo(
    () => [
      { id: "10-29", min: 10, max: 29 },
      { id: "30-49", min: 30, max: 49 },
      { id: "50-99", min: 50, max: 99 },
      { id: "100-199", min: 100, max: Number.POSITIVE_INFINITY },
    ],
    []
  )

  const getRangeInfo = (id?: string) => {
    if (!id) return null
    return ranges.find(r => r.id === id) || null
  }

  const currentRange = getRangeInfo(orderData.quantity)
  const isUnlimited = currentRange ? currentRange.max === Number.POSITIVE_INFINITY : false

  const getMinQuantity = () => currentRange?.min ?? 0
  const getMaxQuantity = () => currentRange?.max ?? 0

  const getTotalSelected = () => {
    return Object.values(orderData.sizes).reduce((sum, qty) => sum + qty, 0)
  }

  const [notice, setNotice] = useState<string | null>(null)
  const prevRangeRef = useRef(orderData.quantity)

  const handleSizeChange = (size: string, value: string) => {
    const numValue = Number.parseInt(value) || 0

    const newSizes = { ...orderData.sizes, [size]: Math.max(0, numValue) }
    const newTotal = Object.values(newSizes).reduce((a, b) => a + b, 0)

    let newQuantityId = orderData.quantity
    const current = currentRange
    if (current && newTotal > current.max && !isUnlimited) {
      const target = ranges.find(r => newTotal >= r.min && newTotal <= r.max)
        || ranges.find(r => r.max === Number.POSITIVE_INFINITY)
      if (target && target.id !== orderData.quantity) {
        newQuantityId = target.id
        setNotice(`Quantidade total (${newTotal}) ultrapassou o limite do range ${current.id}. Alteramos automaticamente para ${target.id}.`)
      }
    } else {
      setNotice(null)
    }

    updateOrderData({ sizes: newSizes, quantity: newQuantityId })

    try {
      const event = new CustomEvent("sizesTotalChange", { detail: { total: newTotal, rangeId: newQuantityId } })
      window.dispatchEvent(event)
    } catch { /* noop */ }
  }

  const maxQty = getMaxQuantity()
  const minQty = getMinQuantity()
  const totalSelected = getTotalSelected()
  const belowMin = !isUnlimited && totalSelected > 0 && totalSelected < minQty

  useEffect(() => {
    if (prevRangeRef.current !== orderData.quantity) {
      prevRangeRef.current = orderData.quantity
    }
  }, [orderData.quantity])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Tamanhos</h2>
      <p className="text-muted-foreground mb-6">Distribua as quantidades entre os tamanhos disponíveis</p>

      {!isUnlimited && (minQty > 0 || maxQty > 0) && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Total selecionado: <strong>{totalSelected}</strong>{maxQty !== Number.POSITIVE_INFINITY ? <> de <strong>{maxQty}</strong></> : null} unidades.
            {minQty > 0 ? <> Mínimo do range atual: <strong>{minQty}</strong>.</> : null}
          </AlertDescription>
        </Alert>
      )}

      {/* {isUnlimited && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Total selecionado: <strong>{totalSelected}</strong> unidades (sem limite)
          </AlertDescription>
        </Alert>
      )} */}

      {belowMin && (
        <Alert className="mb-4 bg-red-500/80 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-white">
            A quantidade total precisa ser de pelo menos <strong>{minQty}</strong> unidades para o range {currentRange?.id}.
          </AlertDescription>
        </Alert>
      )}

      {notice && (
        <Alert className="mb-4 bg-yellow-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      )}

      <div className={isMobile ? "space-y-4" : "grid grid-cols-2 md:grid-cols-4 gap-4"}>
        {sizes.map((size) => {
          const isDisabled = false

          return (
            <div key={size} className={isMobile ? "flex items-center gap-4" : "space-y-2"}>
              <Label htmlFor={`size-${size}`} className={isMobile ? "font-medium w-12" : "font-medium"}>
                {size}
              </Label>
              <Input
                id={`size-${size}`}
                type="number"
                min="0"
                max={undefined}
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
