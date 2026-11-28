import { expect, test } from "vitest"
import { blocksUsing } from "../../src/utils/blocks"

const slugsOf = (classLists: string[][]) =>
  blocksUsing(classLists).map(({ slug }) => slug)

test("a block uses a component when one element has every class of its root selector", () => {
  const buttons = slugsOf([["ui-button"]])
  const primaryButtons = slugsOf([["ui-button", "ui-primary"]])

  expect(primaryButtons.length).toBeGreaterThan(0)
  expect(primaryButtons.length).toBeLessThan(buttons.length)
  expect(buttons).toEqual(expect.arrayContaining(primaryButtons))
  expect(slugsOf([["ui-one-time-code"]]).length).toBeGreaterThan(0)
  expect(slugsOf([["ui-button", "ui-one-time-code"]])).toEqual([])
})

test("a block uses a component when it matches any of its root selectors", () => {
  expect(new Set(slugsOf([["ui-field"], ["ui-tabs"]]))).toEqual(
    new Set([...slugsOf([["ui-field"]]), ...slugsOf([["ui-tabs"]])]),
  )
})
