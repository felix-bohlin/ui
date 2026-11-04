import { execFileSync } from "node:child_process"
import { globSync, readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { expect, test } from "vitest"

const icons = (file: string) =>
  Object.fromEntries(
    [
      ...readFileSync(file, "utf8").matchAll(
        /(\w+): \{\n\s+d: "([^"]+)",\n\s+viewBox: "([^"]+)",/g,
      ),
    ].map(([, name, d, viewBox]) => [name, { d, viewBox }]),
  )

const importErrors = (urls: string[]) =>
  JSON.parse(
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        `const errors = {}
for (const url of ${JSON.stringify(urls)}) {
  try {
    await import(url)
  } catch (error) {
    errors[url] = String(error)
  }
}
console.log(JSON.stringify(errors))`,
      ],
      { encoding: "utf8" },
    ),
  )

test("toaster.js draws the Callout severity icons", () => {
  const callout = icons("packages/opui/components/Callout/icons.ts")
  expect(Object.keys(callout).length).toBeGreaterThan(0)
  expect(icons("packages/opui/elements/toaster.js")).toEqual(callout)
})

test("the elements and the css/js scripts import in Node, which has no DOM", () => {
  const sample = "data:text/javascript,document.title"
  expect(Object.keys(importErrors([sample]))).toEqual([sample])

  const scripts = globSync("packages/opui/{css/js,elements}/*.js").toSorted()
  expect(scripts.length).toBeGreaterThan(0)
  expect(
    importErrors(scripts.map((file) => pathToFileURL(file).href)),
    "a server render that imports these fails: reach the DOM only inside a function or class, and define an element only when customElements exists",
  ).toEqual({})
})
