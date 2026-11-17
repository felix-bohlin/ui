import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { examplesOf, exampleSource } from "../apps/apps.ts"

const FRAMEWORKS = ["react", "solid", "svelte", "vue"] as const

const exported = (barrel: string) =>
  [...barrel.matchAll(/export \{ default as (\w+) \}/g)].map(([, name]) => name)

const imported = (source: string, framework: string) =>
  [
    ...source.matchAll(
      new RegExp(`import \\{([^}]+)\\} from "opui-css/${framework}"`, "g"),
    ),
  ].flatMap(([, names = ""]) =>
    names
      .split(",")
      .map((name) => name.replace(/^\s*type\s+/, "").trim())
      .filter(Boolean),
  )

const unrendered = (barrel: string, sources: string[], framework: string) => {
  const names = new Set(
    sources.flatMap((source) => imported(source, framework)),
  )
  return exported(barrel).filter((name) => !names.has(name))
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
})

test.each(FRAMEWORKS)(
  "every %s component renders in an example the app tests load",
  (framework) => {
    const sources = [...examplesOf(framework)].flatMap(([slug, files]) =>
      files.map(({ file }) => readFileSync(exampleSource(slug, file), "utf8")),
    )
    expect(
      unrendered(
        readFileSync(`packages/opui/${framework}/index.ts`, "utf8"),
        sources,
        framework,
      ),
      `no example imports these components from opui-css/${framework}, so tests/apps never renders them: add an example that does`,
    ).toEqual([])
  },
)
