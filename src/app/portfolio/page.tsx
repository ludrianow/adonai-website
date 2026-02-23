import { readPortfolio } from "@/src/app/portfolio/lib"
import PortfolioClient, { ImageItem, PortfolioGroup } from "@/src/app/portfolio/portfolio-client"

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const data = await readPortfolio()
  const allCategories = Array.from(data.keys()).sort((a, b) => a.localeCompare(b))

  const qRaw = typeof searchParams?.q === "string" ? searchParams!.q : ""
  const q = (qRaw || "").toLowerCase()
  const cat = typeof searchParams?.cat === "string" ? (searchParams!.cat as string) : "Todos"

  const filterItems = (items: ImageItem[]) => {
    if (!q) return items
    return items.filter((i) => i.nome.toLowerCase().includes(q))
  }

  // Prepare data for Client Component
  const groups: PortfolioGroup[] = []

  if (cat === "Todos") {
    allCategories.forEach(c => {
      const items = filterItems(data.get(c) || [])
      if (items.length > 0) {
        groups.push({ name: c, items })
      }
    })
  } else {
    const items = filterItems(data.get(cat) || [])
    if (items.length > 0) {
      groups.push({ name: cat, items })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-muted">Portfólio</h1>
          <p className="text-muted-foreground mt-2">Cada pasta dentro de /images é uma categoria.</p>
        </div>
      </section>

      <PortfolioClient
        groups={groups}
        allCategories={allCategories}
        currentCategory={cat}
        currentQuery={q}
      />
    </main>
  )
}
