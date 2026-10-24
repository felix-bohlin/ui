import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { themeTokens } from "../../src/utils/theme-tokens"
import released from "./released-tokens.json"

const changelog = readFileSync("packages/opui/CHANGELOG.md", "utf8")
const unreleased = changelog.slice(
  0,
  changelog.indexOf(`\n## ${released.version} `),
)
const breaking = [
  ...unreleased.matchAll(
    /^### (Breaking|Removed)\n([\s\S]*?)(?=^### |^## |(?![\s\S]))/gm,
  ),
]
  .map((match) => match[2])
  .join("\n")

test("released tokens still exist or are logged as Breaking or Removed", () => {
  const current = new Set(themeTokens().map((token) => token.name))
  const prefixed = breaking.includes("`--ui-`")
  const gone = released.tokens.filter(
    (name) =>
      !current.has(name) && !(prefixed && current.has(`--ui-${name.slice(2)}`)),
  )
  const unlogged = gone.filter((name) => !breaking.includes(`\`${name}\``))
  expect(unlogged, "removed without a Breaking or Removed entry").toEqual([])
})

test("the released version is in the CHANGELOG", () => {
  expect(changelog).toContain(`\n## ${released.version} `)
})
