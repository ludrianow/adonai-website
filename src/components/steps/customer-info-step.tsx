"use client"

import type { OrderData } from "@/src/components/order-form"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"

type CustomerInfoStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

export function CustomerInfoStep({ orderData, updateOrderData }: CustomerInfoStepProps) {
  const handleChange = (field: string, value: string) => {
    updateOrderData({
      customerInfo: {
        ...orderData.customerInfo,
        [field]: value,
      } as OrderData["customerInfo"],
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dados para Cadastro e Entrega</h2>
      <p className="text-muted-foreground mb-6">Informe seus dados para que possamos processar e entregar seu pedido</p>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Nome completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={orderData.customerInfo?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Seu nome completo"
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={orderData.customerInfo?.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="seu@email.com"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={orderData.customerInfo?.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(00) 00000-0000"
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-sm font-medium">
              Endereço
            </Label>
            <Textarea
              id="address"
              value={orderData.customerInfo?.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Rua, número, complemento"
              rows={3}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium">
                Cidade <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                value={orderData.customerInfo?.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Sua cidade"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="state" className="text-sm font-medium">
                Estado
              </Label>
              <Input
                id="state"
                value={orderData.customerInfo?.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="UF"
                maxLength={2}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-sm font-medium">
                CEP
              </Label>
              <Input
                id="zipCode"
                value={orderData.customerInfo?.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="00000-000"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
