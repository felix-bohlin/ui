import { existsSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"
import generated from "../../scripts/generated-files.json"

test.each(Object.entries(generated))(
  "scripts/generated-files.json lists existing %s in ascending order",
  (_, paths) => {
    expect(paths).toEqual(paths.toSorted())
    expect(paths.filter((path) => !existsSync(path))).toEqual([])
  },
)

test("oxfmt ignores every generated file", () => {
  const ignored = new Set(
    JSON.parse(readFileSync(".oxfmtrc.json", "utf8")).ignorePatterns,
  )
  expect(
    generated.files.filter((path) => !ignored.has(path)),
    "add the path to ignorePatterns in .oxfmtrc.json, or list it under sections when the build only writes a part of it and formats it",
  ).toEqual([])
})
