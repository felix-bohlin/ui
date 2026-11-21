import { readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { parseTodo } from "../../src/utils/todo"
import { todoExamples, todoExamplesFor } from "../../src/utils/todo-examples"

test("every todo example belongs to exactly one item", () => {
  const { done, sections } = parseTodo(
    readFileSync(new URL("../../TODO.md", import.meta.url), "utf-8"),
  )
  const items = [...done, ...sections].flatMap((section) => section.items)

  expect(
    Object.keys(todoExamples).filter(
      (name) =>
        items.filter((item) => todoExamplesFor(item.text).includes(name))
          .length !== 1,
    ),
  ).toEqual([])
})
