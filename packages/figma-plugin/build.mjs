import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL(".", import.meta.url))
const FIGMA = fileURLToPath(new URL("../opui/figma/", import.meta.url))

export const pluginTheme = (id, theme) => ({
  id,
  label:
    theme.collection === "opui"
      ? "Default"
      : theme.collection.replace(/^opui /, ""),
  theme,
})

export const pluginThemes = () =>
  readdirSync(join(FIGMA, "themes"))
    .filter((file) => file.endsWith(".figma.json"))
    .toSorted()
    .map((file) =>
      pluginTheme(
        file.replace(/\.figma\.json$/, ""),
        JSON.parse(readFileSync(join(FIGMA, "themes", file), "utf8")),
      ),
    )

export const pluginFiles = ({ main, sync, themes, ui }) => {
  const json = JSON.stringify(themes).replace(/</g, "\\u003c")
  return {
    "code.js": `${sync}\n${main}`,
    "ui.html": ui.replace("__THEMES__", () => json),
  }
}

export const buildPlugin = (out = join(ROOT, "dist")) => {
  const files = pluginFiles({
    main: readFileSync(join(ROOT, "src/main.js"), "utf8"),
    sync: readFileSync(join(FIGMA, "sync.js"), "utf8"),
    themes: pluginThemes(),
    ui: readFileSync(join(ROOT, "src/ui.html"), "utf8"),
  })
  mkdirSync(out, { recursive: true })
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(out, name), content)
  }
  return out
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = buildPlugin(process.argv[2] && resolve(process.argv[2]))
  console.log(`Wrote the opui Figma plugin to ${out}`)
}
