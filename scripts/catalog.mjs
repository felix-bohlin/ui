import { existsSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { basename, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const apiDir = join(root, "src/component-api")
const docsDir = join(root, "src/docs/components")

let catalog

export const loadCatalog = async () => {
  if (catalog) return catalog
  const { catalogOf } = await import("../src/component-api/catalog.ts")
  const entries = []
  for (const entry of await readdir(apiDir, { withFileTypes: true })) {
    const file = join(apiDir, entry.name, "api.ts")
    if (!entry.isDirectory() || !existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    entries.push([entry.name, api])
  }
  const slugs = (await readdir(docsDir))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => basename(file, ".astro"))
  catalog = catalogOf(entries, slugs)
  return catalog
}
