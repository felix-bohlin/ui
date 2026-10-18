import type { ComponentApi } from "../component-api/types"
import { exampleSources, parseExamplePath } from "./examples"
import { PACKAGE_FRAMEWORK_IDS, type PackageFrameworkId } from "./framework"

const indexes = import.meta.glob<string>("../../packages/opui/*/index.ts", {
  eager: true,
  import: "default",
  query: "?raw",
})

const apiData = import.meta.glob<ComponentApi>("../component-api/*/api.ts", {
  eager: true,
  import: "default",
})

const pascalCase = (slug: string) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, letter: string) => letter.toUpperCase())

const exportedFolders = (framework: PackageFrameworkId) => {
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

const importPattern = new RegExp(
  `import\\s*\\{([^}]*)\\}\\s*from\\s*"opui-css\\/(?:${PACKAGE_FRAMEWORK_IDS.join("|")})"`,
  "g",
)

export const packageFor = (framework: PackageFrameworkId) =>
  `opui-css/${framework}`

export const componentImports = (
  framework: PackageFrameworkId,
  slug: string,
) => {
  const folders = exportedFolders(framework)
  const ownFolders = pageFolders(slug)
  const names = new Set<string>()

  for (const [file, source] of Object.entries(exampleSources)) {
    const example = parseExamplePath(file)
    if (example.slug !== slug || example.framework !== framework) continue
    for (const [, imported] of source.matchAll(importPattern)) {
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
