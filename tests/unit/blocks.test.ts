import { expect, test } from "vitest"
import { blocksUsing } from "../../src/utils/blocks"

const slugsOf = (classLists: string[][]) =>
  blocksUsing(classLists).map(({ slug }) => slug)

test("a block uses a component when one element has every class of its root selector", () => {
  const textFields = blocksUsing([["ui-text-field"]])
  const oneTimeCodes = slugsOf([["ui-text-field", "ui-one-time-code"]])

  expect(oneTimeCodes.length).toBeGreaterThan(0)
  expect(oneTimeCodes.length).toBeLessThan(textFields.length)
  expect(oneTimeCodes).toEqual(
    textFields
      .filter((block) => block.source.includes("ui-one-time-code"))
      .map(({ slug }) => slug),
  )
})

test("a block uses a component when it matches any of its root selectors", () => {
  expect(new Set(slugsOf([["ui-select"], ["ui-tabs"]]))).toEqual(
    new Set([...slugsOf([["ui-select"]]), ...slugsOf([["ui-tabs"]])]),
  )
})
