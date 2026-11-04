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

const images = (source: string) =>
  Object.fromEntries(
    [
      ...source.matchAll(
        /--_(\w+)-image: url\("data:image\/svg\+xml,%3Csvg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='([^']+)'%3E%3Cpath d='([^']+)'\/%3E%3C\/svg%3E"\);/g,
      ),
    ].map(([, name, viewBox, d]) => [name, { d, viewBox }]),
  )

test("toaster.css draws the Callout severity icons and the Drawer close icon", () => {
  const callout = icons("packages/opui/components/Callout/icons.ts")
  const closePath = readFileSync(
    "packages/opui/components/Drawer/icons.ts",
    "utf8",
  ).match(/closePath =\s*"([^"]+)"/)?.[1]
  expect(Object.keys(callout).length).toBeGreaterThan(0)
  expect(closePath).toBeTruthy()
  expect(
    images(readFileSync("packages/opui/css/components/toaster.css", "utf8")),
  ).toEqual({ ...callout, close: { d: closePath, viewBox: "0 0 32 32" } })
})

test("the image reader flags an icon that differs", () => {
  const sample =
    "--_info-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M1 1'/%3E%3C/svg%3E\");"
  expect(images(sample)).toEqual({ info: { d: "M1 1", viewBox: "0 0 32 32" } })
  expect(images(sample)).not.toEqual({
    info: { d: "M2 2", viewBox: "0 0 32 32" },
  })
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
