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

test(".prettierignore ignores every generated file", () => {
  const ignored = new Set(
    readFileSync(".prettierignore", "utf8")
      .split("\n")
      .map((line) => line.trim()),
  )
  expect(
    generated.files.filter((path) => !ignored.has(path)),
    "add the path to .prettierignore, or list it under sections when the build only writes a part of it and formats it",
  ).toEqual([])
})
