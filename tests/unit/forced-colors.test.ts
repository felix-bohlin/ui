import { readdirSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"

const guide = readFileSync("packages/opui/components/AGENTS.md", "utf8")
const section = guide.slice(
  guide.indexOf("### Forced colors"),
  guide.indexOf("### More contrast"),
)
const [withBlock, withoutBlock] = section.split(
  "The components without a block, and why:",
)

const listed = (text: string) =>
  text
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .flatMap((line) =>
      [...line.slice(0, line.indexOf(":")).matchAll(/`([A-Z]\w+)`/g)].map(
        ([, name]) => name,
      ),
    )
    .map((name) => name.replace(/(?<!^)[A-Z]/g, "-$&").toLowerCase())
    .toSorted()

const stylesheets = readdirSync("packages/opui/css/components")
  .filter((file) => file.endsWith(".css"))
  .map((file) => file.replace(/\.css$/, ""))
const withQuery = stylesheets
  .filter((stylesheet) =>
    readFileSync(
      `packages/opui/css/components/${stylesheet}.css`,
      "utf8",
    ).includes("@media (forced-colors: active)"),
  )
  .toSorted()

test("the components with a block are the stylesheets with the media query", () => {
  expect(listed(withBlock)).toEqual(withQuery)
})

test("the components without a block are the other stylesheets", () => {
  expect(listed(withoutBlock)).toEqual(
    stylesheets
      .filter((stylesheet) => !withQuery.includes(stylesheet))
      .toSorted(),
  )
})
