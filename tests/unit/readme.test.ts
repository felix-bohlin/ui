import { readdirSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { exampleThemeNotes } from "../../src/utils/example-theme-notes"

const readme = readFileSync("packages/opui/README.md", "utf8")
const themes = readdirSync("packages/opui/themes")
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(/\.css$/, ""))
  .toSorted()

test("the package README lists every example theme, as scripts/build-readme.mjs writes them", () => {
  expect(themes.length).toBeGreaterThan(0)
  expect(
    readme.match(/Example themes \(([^\n]*?)\), with or without `\.css`/)?.[1],
  ).toBe(themes.map((name) => `\`${name}\``).join(", "))
  const shipped = readme.match(
    /Example themes ship in `themes\/`: ([^\n]*?\))\./,
  )?.[1]
  for (const name of themes) {
    expect(shipped).toContain(
      `\`${name}\` (${exampleThemeNotes(name).original})`,
    )
  }
})
