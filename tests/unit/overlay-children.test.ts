import { readFileSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"

const DIRECTORIES = ["packages/opui/css/compat", "packages/opui/css/components"]

const listsOf = (css: string) =>
  [...css.matchAll(/:not\(([^()]*\[type="hidden"\][^()]*)\)/g)].map(
    ([, list]) =>
      list
        .split(",")
        .map((selector) => selector.trim())
        .join(", "),
  )

const problemsOf = (sheets: { css: string; file: string }[]) => {
  const found = sheets.flatMap(({ css, file }) =>
    listsOf(css).map((list) => ({ file, list })),
  )
  const [first] = found
  return found
    .filter(({ list }) => list !== first.list)
    .map(
      ({ file, list }) =>
        `${file} lists the parts and the children that render nothing as "${list}", but ${first.file} as "${first.list}". Keep every list the same, so a Dialog or Popover picks one scroll mode in every rule`,
    )
}

const sheets = DIRECTORIES.flatMap((directory) =>
  readdirSync(directory)
    .filter((file) => file.endsWith(".css"))
    .toSorted()
    .map((file) => ({
      css: readFileSync(`${directory}/${file}`, "utf8"),
      file: `${directory}/${file}`,
    })),
)

test("every rule lists the same parts and children that render nothing", () => {
  expect(sheets.flatMap(({ css }) => listsOf(css)).length).toBeGreaterThan(1)
  expect(problemsOf(sheets)).toEqual([])
})

test("a list that misses a child is flagged", () => {
  expect(
    problemsOf([
      {
        css: '.a:has(> :not(.ui-content, [type="hidden"], template)) {}',
        file: "a.css",
      },
      {
        css: '.b:has(\n  > :not(\n    .ui-content,\n    [type="hidden"],\n    template\n  )\n) {}',
        file: "b.css",
      },
      { css: '.c:has(> :not(.ui-content, [type="hidden"])) {}', file: "c.css" },
    ]),
  ).toEqual([
    'c.css lists the parts and the children that render nothing as ".ui-content, [type="hidden"]", but a.css as ".ui-content, [type="hidden"], template". Keep every list the same, so a Dialog or Popover picks one scroll mode in every rule',
  ])
})
