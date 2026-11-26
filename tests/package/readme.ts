import { runInNewContext } from "node:vm"

const SECTION = "### Builds that rewrite `light-dark()`"

export const lightDarkSettings = (readme: string) => {
  const start = readme.indexOf(SECTION)
  if (start === -1) throw new Error(`The README has no "${SECTION}" section`)
  const end = readme.indexOf("\n## ", start)
  const section = readme.slice(start, end === -1 ? undefined : end)
  const settings: Record<string, Record<string, unknown>> = Object.fromEntries(
    [
      ...section.matchAll(/```js\n\/\/ (\w+)\.config[^\n]*\n([\s\S]*?)```/g),
    ].map(([, tool = "", body = ""]) => [
      tool,
      JSON.parse(JSON.stringify(runInNewContext(`({${body}})`))),
    ]),
  )
  const missing = ["next", "vite"].filter((tool) => !settings[tool])
  if (missing.length > 0) {
    throw new Error(
      `The README's "${SECTION}" section has no ${missing.join(" or ")}.config block`,
    )
  }
  return settings as {
    next: Record<string, unknown>
    vite: Record<string, unknown>
  }
}
