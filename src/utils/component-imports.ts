import { exampleExtension, type PackageFrameworkId } from "./framework"

const indexes = import.meta.glob<string>("../../packages/opui/*/index.ts", {
  eager: true,
  import: "default",
  query: "?raw",
})

const barrelOf = (framework: PackageFrameworkId) =>
  framework === "nunjucks"
    ? (indexes["../../packages/opui/astro/index.ts"] ?? "").replaceAll(
        '.astro"',
        '.njk"',
      )
    : (indexes[`../../packages/opui/${framework}/index.ts`] ?? "")

export const packageFor = (framework: PackageFrameworkId) =>
  `opui-css/${framework}`

const packageFiles = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>(
      [
        "../../packages/opui/components/**/*.{astro,njk,svelte,ts,tsx,vue}",
        "../../packages/opui/css/js/*.js",
        "../../packages/opui/elements/*.js",
      ],
      { eager: true, import: "default", query: "?raw" },
    ),
  ).map(([file, code]) => [file.replace("../../packages/opui/", ""), code]),
)

const sourceExtension = (framework: PackageFrameworkId) =>
  exampleExtension(framework).slice(framework.length)

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

const macroFile = (name: string) =>
  Object.keys(packageFiles).find((file) => file.endsWith(`/${name}.njk`))

const relativeImports = (path: string) =>
  path.endsWith(".njk")
    ? [...packageFiles[path].matchAll(/\{% from "opui\/(\w+)\.njk"/g)]
        .map(([, name]) => macroFile(name))
        .filter((file) => file !== undefined)
    : [
        ...packageFiles[path].matchAll(
          /(?:from|import)\s*\(?"(\.{1,2}\/[^"]+)"/g,
        ),
      ]
        .map(([, specifier]) => resolveImport(path, specifier))
        .filter((file) => file !== undefined)

export const componentSources = (
  framework: PackageFrameworkId,
  names: string[],
) => {
  const index = barrelOf(framework)
  const exported = new Map<string, string>()
  for (const [, name, path] of index.matchAll(
    /^export \{ default as (\w+) \} from "\.\.\/components\/([^"]+)"/gm,
  )) {
    exported.set(name, `components/${path}${sourceExtension(framework)}`)
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
