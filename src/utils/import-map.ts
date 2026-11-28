import checkboxJs from "@opui/css/js/checkbox.js?url"

const elements = import.meta.glob<string>(
  "../../packages/opui/elements/**/*.js",
  { eager: true, import: "default", query: "?url" },
)

const sources = import.meta.glob<string>(
  "../../packages/opui/elements/**/*.js",
  { eager: true, import: "default", query: "?raw" },
)

const SPECIFIER =
  /(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}\/[^"']*)\1/g

const join = (from: string, specifier: string) => {
  const parts = from.split("/").slice(0, -1)
  for (const part of specifier.split("/")) {
    if (part === "..") parts.pop()
    else if (part !== ".") parts.push(part)
  }
  return parts.join("/")
}

const relativeImports = (path: string, url: string) =>
  Object.fromEntries(
    [...(sources[path] ?? "").matchAll(SPECIFIER)]
      .map(
        ([, , specifier = ""]) =>
          [join(url, specifier), elements[join(path, specifier)]] as const,
      )
      .filter(
        ([requested, served]) => served !== undefined && requested !== served,
      )
      .toSorted(([a], [b]) => a.localeCompare(b)),
  )

const scopes = Object.fromEntries(
  Object.entries(elements)
    .map(([path, url]) => [url, relativeImports(path, url)] as const)
    .filter(([, imports]) => Object.keys(imports).length > 0)
    .toSorted(([a], [b]) => a.localeCompare(b)),
)

export const importMap = JSON.stringify({
  imports: Object.fromEntries(
    [
      ["opui-css/css/js/checkbox.js", checkboxJs],
      ...Object.entries(elements)
        .filter(([path]) => !path.includes("/internal/"))
        .map(([path, url]) => [
          `opui-css/elements/${path.split("/").at(-1)}`,
          url,
        ]),
    ].toSorted(([a], [b]) => a.localeCompare(b)),
  ),
  ...(Object.keys(scopes).length > 0 ? { scopes } : {}),
})
