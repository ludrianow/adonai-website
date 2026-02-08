"use client"

import type { OrderData } from "@/src/components/order-form"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Card } from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Textarea } from "@/src/components/ui/textarea"
import { AlertCircle } from "lucide-react"

type ArtworkStepProps = {
  orderData: OrderData
  updateOrderData: (data: Partial<OrderData>) => void
}

export function ArtworkStep({ orderData, updateOrderData }: ArtworkStepProps) {
  const handleArtworkChange = (value: unknown, _details?: unknown) => {
    const v = String(value)
    updateOrderData({
      hasArtwork: v === "yes",
      artworkDetails: v === "yes" ? undefined : orderData.artworkDetails,
    })
  }

  const handleDetailChange = (field: string, value: string) => {
    updateOrderData({
      artworkDetails: {
        ...orderData.artworkDetails,
        [field]: value,
      } as OrderData["artworkDetails"],
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Arte para Estampa</h2>
      <p className="text-muted-foreground mb-6">Como você prefere fornecer a arte?</p>

      <Card className="p-6 mb-6">
        <RadioGroup
          value={orderData.hasArtwork === undefined ? "" : orderData.hasArtwork ? "yes" : "no"}
          onValueChange={handleArtworkChange}
        >
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="yes" id="has-artwork" />
            <Label htmlFor="has-artwork" className="cursor-pointer">
              Já tenho arte em boa qualidade (PDF/CDR/PSD)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="needs-artwork" />
            <Label htmlFor="needs-artwork" className="cursor-pointer">
              Quero que a equipe de Designers da Adonai Estampas crie a arte
            </Label>
          </div>
        </RadioGroup>
      </Card>

      {orderData.hasArtwork === false && (
        <Card className="p-6">
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              NÃO DEIXE PARA ENVIAR INFORMAÇÕES APÓS TER PREENCHIDO ESSA FICHA! Para desenvolver cada arte é necessário
              tempo e nossos especialistas lhe darão um prazo para entrega do Layout para ser aprovado.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="shirt-color">Cor da camisa</Label>
              <Textarea
                id="shirt-color"
                placeholder="Ex: Branca, preta, azul marinho..."
                value={orderData.artworkDetails?.shirtColor || ""}
                onChange={(e) => handleDetailChange("shirtColor", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="print-colors">Cores da estampa</Label>
              <Textarea
                id="print-colors"
                placeholder="Ex: Vermelho, amarelo e preto"
                value={orderData.artworkDetails?.printColors || ""}
                onChange={(e) => handleDetailChange("printColors", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="front">Frente</Label>
              <Textarea
                id="front"
                placeholder="Descreva o que deseja na frente da camisa"
                value={orderData.artworkDetails?.front || ""}
                onChange={(e) => handleDetailChange("front", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="back">Costas</Label>
              <Textarea
                id="back"
                placeholder="Descreva o que deseja nas costas da camisa"
                value={orderData.artworkDetails?.back || ""}
                onChange={(e) => handleDetailChange("back", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="details">Detalhes localizados</Label>
              <Textarea
                id="details"
                placeholder="Ex: estampa na manga, gola especial, etc."
                value={orderData.artworkDetails?.details || ""}
                onChange={(e) => handleDetailChange("details", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="logos">Logomarcas</Label>
              <Textarea
                id="logos"
                placeholder="Descreva as logomarcas e anexe os arquivos em alta qualidade"
                value={orderData.artworkDetails?.logos || ""}
                onChange={(e) => handleDetailChange("logos", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="inspiration">Modelos de inspiração</Label>
              <Textarea
                id="inspiration"
                placeholder="Anexe ou descreva modelos que sirvam de inspiração"
                value={orderData.artworkDetails?.inspiration || ""}
                onChange={(e) => handleDetailChange("inspiration", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
