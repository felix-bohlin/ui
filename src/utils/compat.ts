const sources = import.meta.glob<string>(
  "../../packages/opui/css/compat/*.css",
  { eager: true, import: "default", query: "?raw" },
)

export const compatCss: Record<string, string> = Object.fromEntries(
  Object.entries(sources)
    .map(([path, css]) => [path.slice(path.lastIndexOf("/") + 1), css])
    .toSorted(([a], [b]) => a.localeCompare(b)),
)
