import { readFileSync } from "node:fs"
import { expect, test } from "vitest"

const icons = (file: string) =>
  Object.fromEntries(
    [
      ...readFileSync(file, "utf8").matchAll(
        /(\w+): \{\n\s+d: "([^"]+)",\n\s+viewBox: "([^"]+)",/g,
      ),
    ].map(([, name, d, viewBox]) => [name, { d, viewBox }]),
  )

test("toaster.js draws the Callout severity icons", () => {
  const callout = icons("packages/opui/components/Callout/icons.ts")
  expect(Object.keys(callout).length).toBeGreaterThan(0)
  expect(icons("packages/opui/elements/toaster.js")).toEqual(callout)
})
