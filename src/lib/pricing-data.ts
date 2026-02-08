// Tabela de precos baseada nas imagens fornecidas

export type SleeveVariant = {
  id: string
  name: string
  priceAdd: number
}

export type ProductType = {
  id: string
  name: string
  image: string
  category: string
  basePrice: number
  sleeveVariants?: SleeveVariant[]
  availableAdditionals: string[]
}

export type AdditionalType = {
  id: string
  name: string
  image: string
  price: number | "consulta"
  appliesTo: string[]
}

// PRODUTOS - 8 produtos conforme solicitado
export const products: ProductType[] = [
  // 1. CAMISA BASICA (com variacao de manga)
  {
    id: "camisa-basica",
    name: "Camisa Basica",
    image: "/images/camisa-basica.jpeg",
    category: "camisa-adulto",
    basePrice: 30,
    sleeveVariants: [
      { id: "manga-curta", name: "Manga Curta", priceAdd: 0 },
      { id: "manga-34", name: "Manga 3/4", priceAdd: 3 },
      { id: "manga-longa", name: "Manga Longa", priceAdd: 5 },
    ],
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-manga-barra", "estampa-total", "gola-v"],
  },
  // 2. CAMISA RAGLAN
  {
    id: "camisa-raglan",
    name: "Camisa Raglan",
    image: "/images/camisa-raglan.jpeg",
    category: "camisa-adulto",
    basePrice: 30,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-manga-barra", "estampa-total", "gola-v"],
  },
  // 3. CAMISA POLO
  {
    id: "camisa-polo",
    name: "Camisa Polo",
    image: "/images/camisa-polo.jpeg",
    category: "polo-adulto",
    basePrice: 45,
    availableAdditionals: ["manga-estampa-polo", "manga-estampa-total-polo", "estampa-barra-polo", "estampa-manga-barra-polo", "estampa-total"],
  },
  // 4. VESTIDO BASICO (Reto)
  {
    id: "vestido-basico",
    name: "Vestido Basico",
    image: "/images/vestido-basico.jpeg",
    category: "vestido-reto-adulto",
    basePrice: 60,
    sleeveVariants: [
      { id: "manga-curta", name: "Manga Curta", priceAdd: 0 },
      { id: "manga-34", name: "Manga 3/4", priceAdd: 3 },
    ],
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-manga-barra", "estampa-total"],
  },
  // 5. VESTIDO RAGLAN
  {
    id: "vestido-raglan",
    name: "Vestido Raglan",
    image: "/images/vestido-raglan.jpeg",
    category: "vestido-reto-adulto",
    basePrice: 60,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-manga-barra", "estampa-total"],
  },
  // 6. VESTIDO COM BABADO
  {
    id: "vestido-babado",
    name: "Vestido com Babado",
    image: "/images/vestido-babado.jpeg",
    category: "vestido-babado-adulto",
    basePrice: 65,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-total"],
  },
  // 7. VESTIDO INFANTIL COM BABADO
  {
    id: "vestido-infantil-babado",
    name: "Vestido Infantil com Babado",
    image: "/images/vestido-babado.jpeg",
    category: "vestido-babado-infantil",
    basePrice: 50,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-total"],
  },
  // 8. VESTIDO INFANTIL BASICO
  {
    id: "vestido-infantil-basico",
    name: "Vestido Infantil Basico",
    image: "/images/vestido-basico.jpeg",
    category: "vestido-reto-infantil",
    basePrice: 47,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-total"],
  },
  // 9. CAMISA BASICA INFANTIL
  {
    id: "camisa-basica-infantil",
    name: "Camisa Basica Infantil",
    image: "/images/camisa-basica.jpeg",
    category: "camisa-infantil",
    basePrice: 26,
    availableAdditionals: ["manga-estampa", "manga-estampa-total", "estampa-barra", "estampa-manga-barra", "estampa-total"],
  },
]

// ADICIONAIS - Preços para somar ao produto base
export const additionals: AdditionalType[] = [
  // Adicionais padrão para camisas/vestidos
  {
    id: "manga-estampa",
    name: "Manga c/ Estampa (detalhe)",
    image: "/images/basica-estampa-manga.jpeg",
    price: 3,
    appliesTo: ["camisa-adulto", "camisa-infantil", "vestido-reto-adulto", "vestido-reto-infantil", "vestido-babado-adulto", "vestido-babado-infantil"],
  },
  {
    id: "manga-estampa-total",
    name: "Manga c/ Estampa Total",
    image: "/images/raglan-estampa-manga.jpeg",
    price: 5,
    appliesTo: ["camisa-adulto", "camisa-infantil", "vestido-reto-adulto", "vestido-reto-infantil", "vestido-babado-adulto", "vestido-babado-infantil"],
  },
  {
    id: "estampa-barra",
    name: "Estampa na Barra",
    image: "/images/estampa-barra.jpeg",
    price: 4,
    appliesTo: ["camisa-adulto", "camisa-infantil", "vestido-reto-adulto", "vestido-reto-infantil"],
  },
  {
    id: "estampa-manga-barra",
    name: "Estampa Manga e Barra",
    image: "/images/estampa-barra.jpeg",
    price: 7,
    appliesTo: ["camisa-adulto", "camisa-infantil", "vestido-reto-adulto"],
  },
  {
    id: "estampa-total",
    name: "Estampa Total",
    image: "/images/camisa-basica.jpeg",
    price: "consulta",
    appliesTo: ["camisa-adulto", "camisa-infantil", "vestido-reto-adulto", "vestido-reto-infantil", "vestido-babado-adulto", "vestido-babado-infantil", "polo-adulto"],
  },
  {
    id: "gola-v",
    name: "Gola V",
    image: "/images/camisa-basica.jpeg",
    price: 2,
    appliesTo: ["camisa-adulto"],
  },
  // Adicionais especificos para POLO (preços diferentes)
  {
    id: "manga-estampa-polo",
    name: "Manga c/ Estampa (detalhe)",
    image: "/images/basica-estampa-manga.jpeg",
    price: 3,
    appliesTo: ["polo-adulto"],
  },
  {
    id: "manga-estampa-total-polo",
    name: "Manga c/ Estampa Total",
    image: "/images/raglan-estampa-manga.jpeg",
    price: 5,
    appliesTo: ["polo-adulto"],
  },
  {
    id: "estampa-barra-polo",
    name: "Estampa na Barra",
    image: "/images/estampa-barra.jpeg",
    price: 5,
    appliesTo: ["polo-adulto"],
  },
  {
    id: "estampa-manga-barra-polo",
    name: "Estampa Manga e Barra",
    image: "/images/estampa-barra.jpeg",
    price: 8,
    appliesTo: ["polo-adulto"],
  },
]

// Helper para obter produto por ID
export function getProductById(id: string): ProductType | undefined {
  return products.find(p => p.id === id)
}

// Helper para obter adicionais disponiveis para um produto
export function getAdditionalsForProduct(productId: string): AdditionalType[] {
  const product = getProductById(productId)
  if (!product) return []

  return additionals.filter(add =>
    product.availableAdditionals.includes(add.id)
  )
}

// Helper para calcular preco total
export function calculateTotal(
  productId: string,
  selectedAdditionals: string[],
  quantity: number,
  sleeveVariant?: string
): { unitPrice: number; sleevePrice: number; additionalsPrice: number; totalUnit: number; total: number; breakdown: string[] } {
  const product = getProductById(productId)
  if (!product) {
    return { unitPrice: 0, sleevePrice: 0, additionalsPrice: 0, totalUnit: 0, total: 0, breakdown: [] }
  }

  const unitPrice = product.basePrice
  let sleevePrice = 0
  let additionalsPrice = 0
  const breakdown: string[] = []

  breakdown.push(`${product.name}: R$ ${unitPrice.toFixed(2)}`)

  // Adicionar preco da variacao de manga se houver
  if (sleeveVariant && product.sleeveVariants) {
    const sleeve = product.sleeveVariants.find(s => s.id === sleeveVariant)
    if (sleeve && sleeve.priceAdd > 0) {
      sleevePrice = sleeve.priceAdd
      breakdown.push(`+ ${sleeve.name}: R$ ${sleevePrice.toFixed(2)}`)
    }
  }

  const hasConsultation = selectedAdditionals.some(addId => {
    const a = additionals.find(x => x.id === addId)
    return a && a.price === "consulta"
  })

  for (const addId of selectedAdditionals) {
    const additional = additionals.find(a => a.id === addId)
    if (!additional) continue
    if (additional.price === "consulta") {
      breakdown.push(`+ ${additional.name}: SOB CONSULTA`)
    } else if (typeof additional.price === "number") {
      additionalsPrice += additional.price
      breakdown.push(`+ ${additional.name}: R$ ${additional.price.toFixed(2)}`)
    }
  }

  const totalUnit = hasConsultation ? unitPrice : unitPrice + sleevePrice + additionalsPrice
  const total = totalUnit * quantity

  return { unitPrice, sleevePrice, additionalsPrice, totalUnit, total, breakdown }
}

// Helper para formatar preço
export function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`
}
