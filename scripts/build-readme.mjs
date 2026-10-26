import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { format, resolveConfig } from "prettier"
import {
  EXAMPLE_THEME_NOTES,
  exampleThemeNotes,
} from "../src/utils/example-theme-notes.ts"

const root = fileURLToPath(new URL("..", import.meta.url))
const README = `${root}packages/opui/README.md`
const THEMES = `${root}packages/opui/themes`

const themes = readdirSync(THEMES)
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(/\.css$/, ""))
  .toSorted()
const stale = Object.keys(EXAMPLE_THEME_NOTES).filter(
  (name) => !themes.includes(name),
)
if (stale.length > 0) {
  throw new Error(
    `EXAMPLE_THEME_NOTES (src/utils/example-theme-notes.ts) describes themes that packages/opui/themes/ doesn't have: ${stale.join(", ")}`,
  )
}

const and = (items) =>
  new Intl.ListFormat("en-GB", { type: "conjunction" }).format(items)

const SECTIONS = [
  [
    /Example themes \(`[^\n]*?`\), with or without `\.css`/,
    `Example themes (${themes.map((name) => `\`${name}\``).join(", ")}), with or without \`.css\``,
  ],
  [
    /Example themes ship in `themes\/`: [^\n]*?\)\./,
    `Example themes ship in \`themes/\`: ${and(
      themes.map((name) => `\`${name}\` (${exampleThemeNotes(name).original})`),
    )}.`,
  ],
]

let readme = readFileSync(README, "utf8")
for (const [pattern, text] of SECTIONS) {
  if (!pattern.test(readme)) {
    throw new Error(
      `packages/opui/README.md has no text that matches ${pattern}; scripts/build-readme.mjs writes the example theme list there`,
    )
  }
  readme = readme.replace(pattern, () => text)
}
writeFileSync(
  README,
  await format(readme, {
    ...(await resolveConfig(README)),
    filepath: README,
  }),
)
console.log(`Wrote the ${themes.length} example themes to ${README}`)
