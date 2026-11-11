import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "vitest"
import { builtInLabels } from "../../src/utils/built-in-labels"

type Found = { file: string; name: string; value: string }

const findLabels = (file: string, source: string) => {
  const found: Found[] = []
  const add = (name = "", value = "") => found.push({ file, name, value })
  if (file.endsWith(".astro")) {
    for (const [, name, value] of source.matchAll(/\b(\w+Label) = "([^"]*)"/g))
      add(name, value)
  }
  if (file.endsWith(".js")) {
    for (const [, name, value] of source.matchAll(
      /getAttribute\("([\w-]*label)"\) \?\? "([^"]*)"/g,
    ))
      add(name, value)
    for (const [, value] of source.matchAll(/^const LABEL = "([^"]*)"/gm))
      add("label", value)
    const labels = source.match(/^const LABELS = \{([\s\S]*?)\n\}/m)?.[1] ?? ""
    for (const [, key, value] of labels.matchAll(/(\w+): "([^"]*)"/g))
      add(`${key}-label`, value)
  }
  if (file.endsWith(".css")) {
    for (const [, name, value] of source.matchAll(
      /(--_[\w-]*label):\s*"([^"]*)"/g,
    ))
      add(name, value)
  }
  return found
}

const filesIn = (dir: string, extension: string) =>
  readdirSync(dir, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(extension))
    .map((file) => path.join(dir, file))

const found = [
  ...filesIn("packages/opui/components", ".astro"),
  ...filesIn("packages/opui/elements", ".js"),
  ...filesIn("packages/opui/css/components", ".css"),
].flatMap((file) => findLabels(file, readFileSync(file, "utf8")))

const listed = (label: Found) =>
  builtInLabels.some(
    (entry) =>
      entry.default === label.value &&
      (label.file.endsWith(".astro")
        ? entry.prop === label.name
        : entry.html === label.name),
  )

test("finds a default label in a component, an element and a stylesheet", () => {
  const samples = [
    findLabels("Sample.astro", 'const { fooLabel = "Foo" } = Astro.props'),
    findLabels("sample.js", 'this.getAttribute("foo-label") ?? "Foo"'),
    findLabels("sample.css", ':where(.ui-sample) { --_foo-label: "Foo"; }'),
  ].flat()
  expect(samples.map(({ name, value }) => `${name}=${value}`)).toEqual([
    "fooLabel=Foo",
    "foo-label=Foo",
    "--_foo-label=Foo",
  ])
  expect(samples.filter((label) => !listed(label))).toHaveLength(3)
})

test("every English default label is in the Built-in labels list of the Accessibility guide", () => {
  expect(found.length).toBeGreaterThan(10)
  expect(
    found
      .filter((label) => !listed(label))
      .map(({ file, name, value }) => `${file}: ${name} = "${value}"`),
    "add these to src/utils/built-in-labels.ts, which the Accessibility guide lists under Built-in labels",
  ).toEqual([])
})

test("every entry in the Built-in labels list is a default label the package has", () => {
  expect(
    builtInLabels
      .filter(
        (entry) =>
          !found.some(
            (label) =>
              label.value === entry.default &&
              (label.name === entry.prop || label.name === entry.html),
          ),
      )
      .map(({ component, prop }) => `${component} ${prop}`),
    "remove these from src/utils/built-in-labels.ts, or fix their default",
  ).toEqual([])
})
