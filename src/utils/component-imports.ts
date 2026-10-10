import type { ComponentApi } from "../component-api/types"

type ImportFramework = "astro" | "svelte" | "vue"

const extensions = { astro: "astro", svelte: "svelte", vue: "vue" }

const examples = import.meta.glob<string>(
  "../component-examples/*/*.{astro,svelte,vue}",
  { eager: true, import: "default", query: "?raw" },
)

const indexes = import.meta.glob<string>(
  "../../packages/opui/{astro,svelte,vue}/index.ts",
  { eager: true, import: "default", query: "?raw" },
)

const apiData = import.meta.glob<ComponentApi>("../component-api/*/api.ts", {
  eager: true,
  import: "default",
})

const pascalCase = (slug: string) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, letter: string) => letter.toUpperCase())

const exportedFolders = (framework: ImportFramework) => {
  const source = indexes[`../../packages/opui/${framework}/index.ts`] ?? ""
  const folders = new Map<string, string>()
  for (const [, names, folder] of source.matchAll(
    /^export \{([^}]*)\} from "\.\.\/components\/([^/]+)\//gm,
  )) {
    for (const name of names.split(",")) {
      const exported = name
        .trim()
        .split(/\s+as\s+/)
        .pop()
      if (exported) folders.set(exported, folder)
    }
  }
  return folders
}

const pageFolders = (slug: string) =>
  new Set([
    pascalCase(slug),
    ...Object.entries(apiData)
      .filter(
        ([file, api]) =>
          (api.page ?? file.match(/component-api\/([^/]+)\//)?.[1]) === slug,
      )
      .flatMap(([, api]) => api.source ?? []),
  ])

export const packageFor = (framework: ImportFramework) =>
  `opui-css/${framework}`

export const componentImports = (framework: ImportFramework, slug: string) => {
  const folders = exportedFolders(framework)
  const ownFolders = pageFolders(slug)
  const names = new Set<string>()

  for (const [file, source] of Object.entries(examples)) {
    if (
      !file.startsWith(`../component-examples/${slug}/`) ||
      !file.endsWith(`.${extensions[framework]}`)
    )
      continue
    for (const [, imported] of source.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*"(?:@opui|opui-css)\/(?:astro|svelte|vue)"/g,
    )) {
      for (const name of imported.split(",")) {
        const trimmed = name.trim()
        if (trimmed && ownFolders.has(folders.get(trimmed) ?? "")) {
          names.add(trimmed)
        }
      }
    }
  }

  return [...names].toSorted()
}
