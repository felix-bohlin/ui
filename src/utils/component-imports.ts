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
        if (
          trimmed &&
          (ownFolders.has(folders.get(trimmed) ?? "") ||
            trimmed.startsWith(pascalCase(slug)))
        ) {
          names.add(trimmed)
        }
      }
    }
  }

  return [...names].toSorted()
}

const packageFiles = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>(
      [
        "../../packages/opui/components/**/*.{astro,svelte,ts,tsx,vue}",
        "../../packages/opui/css/js/*.js",
        "../../packages/opui/elements/*.js",
      ],
      { eager: true, import: "default", query: "?raw" },
    ),
  ).map(([file, code]) => [file.replace("../../packages/opui/", ""), code]),
)

const sourceExtension = {
  astro: "",
  react: ".tsx",
  svelte: "",
  vue: "",
} satisfies Record<PackageFrameworkId, string>

const langOf = (path: string) => path.slice(path.lastIndexOf(".") + 1)

const resolveImport = (from: string, specifier: string) => {
  const parts = from.split("/").slice(0, -1)
  for (const part of specifier.split("/")) {
    if (part === "..") parts.pop()
    else if (part !== ".") parts.push(part)
  }
  const path = parts.join("/")
  return [path, `${path}.js`, `${path}.ts`, `${path}.tsx`].find(
    (file) => file in packageFiles,
  )
}

const relativeImports = (path: string) =>
  [...packageFiles[path].matchAll(/(?:from|import)\s*\(?"(\.{1,2}\/[^"]+)"/g)]
    .map(([, specifier]) => resolveImport(path, specifier))
    .filter((file) => file !== undefined)

export const componentSources = (
  framework: PackageFrameworkId,
  names: string[],
) => {
  const index = indexes[`../../packages/opui/${framework}/index.ts`] ?? ""
  const exported = new Map<string, string>()
  for (const [, name, path] of index.matchAll(
    /^export \{ default as (\w+) \} from "\.\.\/components\/([^"]+)"/gm,
  )) {
    exported.set(name, `components/${path}${sourceExtension[framework]}`)
  }
  const entries = names.flatMap((name) => {
    const path = exported.get(name)
    return path && path in packageFiles ? [path] : []
  })
  const seen = new Set(entries)
  const queue = [...entries]
  while (queue.length > 0) {
    for (const file of relativeImports(queue.shift()!)) {
      if (seen.has(file)) continue
      seen.add(file)
      queue.push(file)
    }
  }
  return [...seen].toSorted().map((path) => ({
    code: packageFiles[path],
    lang: langOf(path),
    title: path,
  }))
}
