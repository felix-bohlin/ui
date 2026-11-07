import { expect, test } from "vitest"
import { leadSentence } from "../../src/utils/lead-sentence"

const rest =
  "Set it to `0` for square corners, or to a larger length for rounder ones."

test("splits after the first sentence", () => {
  expect(leadSentence(`Corner radius for every component. ${rest}`)).toEqual([
    "Corner radius for every component.",
    rest,
  ])
})

test("keeps a short remainder in the lead", () => {
  const text =
    "Corner radius for `Chip`. When unset, chips follow `--ui-radius`."
  expect(leadSentence(text)).toEqual([text, ""])
})

test("ignores a period inside code", () => {
  const text = `Default is \`0. 5\` here and more words. ${rest}`
  expect(leadSentence(text)[0]).toBe("Default is `0. 5` here and more words.")
})

test("cuts a long first sentence at its colon", () => {
  const list =
    "the head and foot rules of rich text tables, the AvatarGroup ring, the Badge border and the Tabs indicator"
  expect(leadSentence(`Width of emphasized rules: ${list}.`)).toEqual([
    "Width of emphasized rules.",
    `The${list.slice(3)}.`,
  ])
})
