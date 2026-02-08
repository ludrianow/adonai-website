import fs from "node:fs/promises"
import path from "node:path"

export type ImageItem = {
  src: string
  nome: string
  categoria: string
}

function prettyName(s: string) {
  return s
    .split(/[-_]/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export async function readPortfolio(): Promise<Map<string, ImageItem[]>> {
  const baseDir = path.join(process.cwd(), "public", "images")
  const map = new Map<string, ImageItem[]>()
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true })
    for (const dirent of entries) {
      if (!dirent.isDirectory()) continue
      const cat = dirent.name
      const dir = path.join(baseDir, cat)
      const files = await fs.readdir(dir, { withFileTypes: true })
      const images: ImageItem[] = []
      for (const f of files) {
        if (!f.isFile()) continue
        if (!/\.(jpe?g|png|webp)$/i.test(f.name)) continue
        const nome = f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
        images.push({
          src: `/images/${cat}/${f.name}`,
          nome,
          categoria: prettyName(cat),
        })
      }
      if (images.length > 0) {
        map.set(prettyName(cat), images)
      }
    }
  } catch {
    return map
  }
  return map
}
