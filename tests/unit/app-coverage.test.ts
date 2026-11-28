import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { HYDRATED_FRAMEWORK_IDS } from "../../src/utils/framework"
import { examplesOf, exampleSource } from "../apps/apps.ts"

const FRAMEWORKS = [...HYDRATED_FRAMEWORK_IDS, "nunjucks"] as const

const barrelOf = (framework: string) =>
  framework === "nunjucks"
    ? "packages/opui/nunjucks/index.njk"
    : `packages/opui/${framework}/index.ts`

const exported = (barrel: string, framework: string) =>
  [
    ...barrel.matchAll(
      framework === "nunjucks"
        ? /\{% set (\w+) = /g
        : /export \{ default as (\w+) \}/g,
    ),
  ].map(([, name]) => name)

const imported = (source: string, framework: string) =>
  [
    ...source.matchAll(
      framework === "nunjucks"
        ? /\{%-?\s*from\s+"opui\/index\.njk"\s+import\s+([^%]+?)\s*-?%\}/g
        : new RegExp(`import \\{([^}]+)\\} from "opui-css/${framework}"`, "g"),
    ),
  ].flatMap(([, names = ""]) =>
    names
      .split(",")
      .map(
        (name) =>
          name
            .replace(/^\s*type\s+/, "")
            .trim()
            .split(/\s+/)[0],
      )
      .filter(Boolean),
  )

const unrendered = (barrel: string, sources: string[], framework: string) => {
  const names = new Set(
    sources.flatMap((source) => imported(source, framework)),
  )
  return exported(barrel, framework).filter((name) => !names.has(name))
}

test("the check flags a component that no example imports", () => {
  expect(
    unrendered(
      [
        'export { default as Button } from "../components/Button/Button.react"',
        'export { default as Card } from "../components/Card/Card.react"',
      ].join("\n"),
      ['import {\n  Button,\n  type ButtonProps,\n} from "opui-css/react"'],
      "react",
    ),
  ).toEqual(["Card"])
  expect(
    unrendered(
      [
        '{% from "opui/Button.njk" import Button %}\n{% set Button = Button %}',
        '{% from "opui/Card.njk" import Card %}\n{% set Card = Card %}',
      ].join("\n"),
      ['{% from "opui/index.njk" import\n  Button,\n  Divider\n%}'],
      "nunjucks",
    ),
  ).toEqual(["Card"])
})

test.each(FRAMEWORKS)(
  "every %s component renders in an example the app tests load",
  (framework) => {
    const sources = [...examplesOf(framework)].flatMap(([slug, files]) =>
      files.map(({ file }) => readFileSync(exampleSource(slug, file), "utf8")),
    )
    expect(
      unrendered(readFileSync(barrelOf(framework), "utf8"), sources, framework),
      `no example imports these components from ${framework === "nunjucks" ? "opui/index.njk" : `opui-css/${framework}`}, so tests/apps never renders them: add an example that does`,
    ).toEqual([])
  },
)
