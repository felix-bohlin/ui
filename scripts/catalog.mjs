import { existsSync, readdirSync, readFileSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import { barrelExports } from "../src/utils/package-source.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const apiDir = join(root, "src/component-api")
const examplesDir = join(root, "src/component-examples")
const packageDir = join(root, "packages/opui")

const BARRELS = ["astro", "react", "solid", "svelte", "vue"]

const read = (file) => (existsSync(file) ? readFileSync(file, "utf8") : "")

let catalog

export const loadCatalog = async () => {
  if (catalog) return catalog
  const { catalogOf } = await import("../src/component-api/catalog.ts")
  const { pages } = await import("../src/component-api/pages.ts")
  const entries = []
  for (const entry of await readdir(apiDir, { withFileTypes: true })) {
    const file = join(apiDir, entry.name, "api.ts")
    if (!entry.isDirectory() || !existsSync(file)) continue
    const { default: api } = await import(pathToFileURL(file).href)
    entries.push([entry.name, api])
  }
  catalog = catalogOf({
    apis: entries,
    exports: Object.fromEntries(
      BARRELS.map((barrel) => [
        barrel,
        barrelExports(read(join(packageDir, barrel, "index.ts"))).map(
          ({ name }) => name,
        ),
      ]),
    ),
    pages,
    sources: {
      examples: (page) => {
        const dir = join(examplesDir, page)
        return existsSync(dir)
          ? readdirSync(dir)
              .filter((file) => file.endsWith(".html"))
              .toSorted()
              .map((file) => readFileSync(join(dir, file), "utf8"))
          : []
      },
      stylesheet: (name) => {
        const file = join(packageDir, "css/components", `${name}.css`)
        return existsSync(file) ? readFileSync(file, "utf8") : undefined
      },
    },
  })
  return catalog
}
