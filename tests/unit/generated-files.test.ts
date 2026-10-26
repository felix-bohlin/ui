import { existsSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"
import generated from "../../scripts/generated-files.json"

test("scripts/generated-files.json lists existing paths in ascending order", () => {
  expect(generated).toEqual(generated.toSorted())
  expect(generated.filter((path) => !existsSync(path))).toEqual([])
})

test(".prettierignore ignores every generated file", () => {
  const ignored = new Set(
    readFileSync(".prettierignore", "utf8")
      .split("\n")
      .map((line) => line.trim()),
  )
  expect(
    generated.filter((path) => !ignored.has(path)),
    "add the path to .prettierignore",
  ).toEqual([])
})
