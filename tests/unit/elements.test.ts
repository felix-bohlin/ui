import { execFileSync } from "node:child_process"
import { globSync, readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { expect, expectTypeOf, test } from "vitest"
import type { CalloutElement } from "../../packages/opui/elements/callout.js"
import type { CharacterCountElement } from "../../packages/opui/elements/character-count.js"
import type { CopyElement } from "../../packages/opui/elements/copy.js"
import type { NumberFieldElement } from "../../packages/opui/elements/number-field.js"
import type { SelectAllElement } from "../../packages/opui/elements/select-all.js"
import type { SortableTableElement } from "../../packages/opui/elements/sortable-table.js"
import type { TextFieldElement } from "../../packages/opui/elements/text-field.js"
import type { ToasterElement } from "../../packages/opui/elements/toaster.js"

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

const typingProblems = (file: string, script: string, types: string) =>
  [...script.matchAll(/customElements\.define\("([\w-]+)", (\w+)\)/g)].flatMap(
    ([, tag, name]) => [
      ...(name.endsWith("Element")
        ? []
        : [
            `${file}.js defines <${tag}> as ${name}, which doesn't end in Element`,
          ]),
      ...(types.includes(`export declare class ${name} extends HTMLElement`)
        ? []
        : [`${file}.d.ts doesn't declare the class ${name}`]),
      ...(new RegExp(
        `declare global \\{\\s*interface HTMLElementTagNameMap \\{[^}]*"${tag}": ${name}\\n`,
      ).test(types)
        ? []
        : [
            `${file}.d.ts doesn't map "${tag}" to ${name} in HTMLElementTagNameMap`,
          ]),
    ],
  )

test("each element module exports a class named <Component>Element, and its types map the tag to it", () => {
  const scripts = globSync("packages/opui/elements/*.js").toSorted()
  expect(
    scripts.filter((file) =>
      readFileSync(file, "utf8").includes("customElements.define("),
    ).length,
  ).toBeGreaterThan(0)
  expect(
    scripts.flatMap((file) =>
      typingProblems(
        file.replace(/\.js$/, ""),
        readFileSync(file, "utf8"),
        readFileSync(file.replace(/\.js$/, ".d.ts"), "utf8"),
      ),
    ),
    "querySelector finds the class through HTMLElementTagNameMap",
  ).toEqual([])
})

test("the typing check flags a class without the suffix and a tag missing from HTMLElementTagNameMap", () => {
  expect(
    typingProblems(
      "a",
      'customElements.define("opui-a", A)',
      "export declare class A extends HTMLElement {}",
    ),
  ).toEqual([
    "a.js defines <opui-a> as A, which doesn't end in Element",
    'a.d.ts doesn\'t map "opui-a" to A in HTMLElementTagNameMap',
  ])
  expect(
    typingProblems(
      "b",
      'customElements.define("opui-b", BElement)',
      'export declare class BElement extends HTMLElement {}\n\ndeclare global {\n  interface HTMLElementTagNameMap {\n    "opui-b": BElement\n  }\n}\n',
    ),
  ).toEqual([])
})

test("querySelector returns the element class of an opui tag", () => {
  const query = (root: ParentNode) => ({
    callout: root.querySelector("opui-callout"),
    characterCount: root.querySelector("opui-character-count"),
    copy: root.querySelector("opui-copy"),
    numberField: root.querySelector("opui-number-field"),
    selectAll: root.querySelector("opui-select-all"),
    sortableTable: root.querySelector("opui-sortable-table"),
    textField: root.querySelector("opui-text-field"),
    toaster: root.querySelector("opui-toaster"),
  })
  expectTypeOf(query).returns.toEqualTypeOf<{
    callout: CalloutElement | null
    characterCount: CharacterCountElement | null
    copy: CopyElement | null
    numberField: NumberFieldElement | null
    selectAll: SelectAllElement | null
    sortableTable: SortableTableElement | null
    textField: TextFieldElement | null
    toaster: ToasterElement | null
  }>()
})
