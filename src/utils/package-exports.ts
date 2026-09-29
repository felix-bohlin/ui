import astroIndex from "@opui/astro/index.ts?raw"
import vueIndex from "@opui/vue/index.ts?raw"
import { components } from "./components"
import type { FrameworkId } from "./framework-routing"

const INDEXES: Partial<Record<FrameworkId, string>> = {
  astro: astroIndex,
  vue: vueIndex,
}

const exportNames = (source: string) =>
  Array.from(source.matchAll(/export\s*\{([^}]*)\}/g), ([, list]) => list)
    .flatMap((list) => list.split(","))
    .map(
      (entry) =>
        entry
          .trim()
          .split(/\s+as\s+/)
          .pop() ?? "",
    )
    .filter(Boolean)

const pascalCase = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")

export function componentExportsFor(framework: FrameworkId, slug: string) {
  const source = INDEXES[framework]
  if (!source) return []

  const name = pascalCase(slug)
  const longerNames = components
    .map((component) => pascalCase(component.slug))
    .filter((other) => other !== name && other.startsWith(name))

  return exportNames(source)
    .filter(
      (exportName) =>
        exportName.startsWith(name) &&
        !longerNames.some((other) => exportName.startsWith(other)),
    )
    .sort((a, b) => a.localeCompare(b))
}
