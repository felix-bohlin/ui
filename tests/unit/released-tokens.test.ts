import { readFileSync, writeFileSync } from "node:fs"
import { expect, test } from "vitest"
import opui from "../../packages/opui/package.json"
import { themeTokens } from "../../src/utils/theme-tokens"
import released from "./released-tokens.json"

if (process.env.RELEASED_RECORD) {
  released.version = opui.version
  released.tokens = themeTokens()
    .map((token) => token.name)
    .toSorted()
  writeFileSync(
    "tests/unit/released-tokens.json",
    `${JSON.stringify(released, null, 2)}\n`,
  )
}

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

const unlogged = (tokens: string[], current: Set<string>, logged: string) => {
  const prefixed = logged.includes("`--ui-`")
  return tokens.filter(
    (name) =>
      !current.has(name) &&
      !(prefixed && current.has(`--ui-${name.slice(2)}`)) &&
      !logged.includes(`\`${name}\``),
  )
}

test("released tokens still exist or are logged as Breaking or Removed", () => {
  expect(
    unlogged(
      released.tokens,
      new Set(themeTokens().map((token) => token.name)),
      breaking,
    ),
    "removed without a Breaking or Removed entry",
  ).toEqual([])
})

test("the rule flags a token that disappeared without an entry", () => {
  const current = new Set(["--ui-kept", "--ui-renamed"])
  expect(unlogged(["--ui-kept", "--ui-gone"], current, "")).toEqual([
    "--ui-gone",
  ])
  expect(unlogged(["--ui-gone"], current, "- `--ui-gone` is gone.")).toEqual([])
  expect(
    unlogged(["--renamed"], current, "- Tokens gain the `--ui-` prefix."),
  ).toEqual([])
})

test("the released version is in the CHANGELOG", () => {
  expect(changelog).toContain(`\n## ${released.version} `)
})
