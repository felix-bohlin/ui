const sources = import.meta.glob<string>(
  "../../packages/opui/css/compat/*.css",
  { eager: true, import: "default", query: "?raw" },
)

export const compatCss = Object.fromEntries(
  Object.entries(sources)
    .map(([path, css]) => [path.slice(path.lastIndexOf("/") + 1), css] as const)
    .toSorted(([a], [b]) => a.localeCompare(b)),
)
