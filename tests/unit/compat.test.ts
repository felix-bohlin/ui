import { existsSync, readdirSync, readFileSync } from "node:fs"
import postcss, { type AtRule, type Node, type Root } from "postcss"
import { expect, test } from "vitest"
import { features } from "web-features"
import {
  ENGINE_GATES,
  baselineYear,
  baselineYears,
  featureIds,
  keepsFallback,
  withoutCompat,
} from "../../packages/opui/scripts/features.mjs"

const CSS = "packages/opui/css"

const read = (file: string) => readFileSync(`${CSS}/${file}`, "utf8")
const importsOf = (file: string) =>
  [...read(file).matchAll(/^@import "([^"]+)";$/gm)].map(([, path]) => path)

const compatFiles = readdirSync(`${CSS}/compat`)
  .filter((file) => file.endsWith(".css"))
  .toSorted()

const isCompatLayer = (node: Node) =>
  node.type === "atrule" &&
  (node as AtRule).name === "layer" &&
  (node as AtRule).params === "components.compat"

const inCompat = (node: Node | undefined): boolean =>
  !!node && (isCompatLayer(node) || inCompat(node.parent as Node | undefined))

const supports = (root: Root, compat: boolean) => {
  const found: string[] = []
  root.walkAtRules("supports", (rule) => {
    if (inCompat(rule.parent as Node) === compat) found.push(rule.params)
  })
  return found
}

const compatCss = compatFiles.map((file) => read(`compat/${file}`)).join("\n")
const conditions = supports(postcss.parse(compatCss), true)

const run = (css: string, plugin: ReturnType<typeof withoutCompat>) =>
  postcss([plugin]).process(css, { from: undefined }).root

test("compat.css imports layers.css, then every compat file in ascending order", () => {
  expect(compatFiles.length).toBeGreaterThan(0)
  expect(importsOf("compat.css")).toEqual([
    "./layers.css",
    ...compatFiles.map((file) => `./compat/${file}`),
  ])
})

test("imports.css imports compat.css right after components.css", () => {
  const imports = importsOf("imports.css")
  expect(imports.indexOf("./compat.css")).toBe(
    imports.indexOf("./components.css") + 1,
  )
})

test("each compat file belongs to a component stylesheet", () => {
  expect(
    compatFiles.filter((file) => !existsSync(`${CSS}/components/${file}`)),
  ).toEqual([])
})

test("each compat file is one components.compat layer of @supports blocks", () => {
  const problems = compatFiles.flatMap((file) => {
    const nodes = postcss
      .parse(read(`compat/${file}`))
      .nodes.filter((node) => node.type !== "comment")
    const [layer] = nodes
    if (
      nodes.length !== 1 ||
      layer.type !== "atrule" ||
      layer.name !== "layer" ||
      layer.params !== "components.compat"
    ) {
      return [`${file} is not a single @layer components.compat block`]
    }
    return (layer.nodes ?? [])
      .filter(
        (node) =>
          node.type !== "comment" &&
          !(node.type === "atrule" && node.name === "supports"),
      )
      .map(() => `${file} has a rule outside @supports`)
  })
  expect(problems).toEqual([])
})

test("each fallback tests one web feature that isn't widely available, or is an engine gate", () => {
  const problems = conditions.flatMap((condition) => {
    if (!/^not\s/.test(condition)) {
      return ENGINE_GATES.includes(condition)
        ? []
        : [`${condition} is neither a not (...) test nor in ENGINE_GATES`]
    }
    const ids = featureIds(condition)
    if (ids.length !== 1) {
      return [`${condition} matches ${ids.length} web features (${ids})`]
    }
    const feature = features[ids[0]]
    if (feature.kind !== "feature") {
      return [`${condition}: ${ids[0]} is a ${feature.kind} entry`]
    }
    return feature.status.baseline === "high"
      ? [`${condition}: ${ids[0]} is Baseline widely available, remove it`]
      : []
  })
  expect(problems).toEqual([])
})

test("baselineYears runs from 2023 to the latest Baseline year", () => {
  const latest = Math.max(
    ...Object.values(features).flatMap((feature) =>
      feature.kind === "feature" && feature.status.baseline_low_date
        ? [Number(feature.status.baseline_low_date.match(/\d{4}/)?.[0])]
        : [],
    ),
  )
  const years = baselineYears()
  expect(years).toEqual(
    Array.from({ length: latest - 2022 }, (_, index) => 2023 + index),
  )
})

test("keepsFallback keeps a fallback until its feature is Baseline", () => {
  expect(keepsFallback("(-webkit-touch-callout: none)", 2026)).toBe(true)
  expect(keepsFallback("not (color: light-dark(red, blue))", 2023)).toBe(true)
  expect(keepsFallback("not (color: light-dark(red, blue))", 2024)).toBe(false)
  expect(keepsFallback("not (corner-shape: squircle)", 2026)).toBe(true)
  expect(keepsFallback("not (field-sizing: content)", 2025)).toBe(true)
  expect(keepsFallback("not (field-sizing: content)", 2026)).toBe(false)
})

test("baselineYear drops the fallbacks a year doesn't need, and empty layers", () => {
  const css = `@layer components.compat {
    @supports not (corner-shape: squircle) { a { color: red; } }
    @supports not (field-sizing: content) { b { color: red; } }
  }
  @layer components.compat {
    @supports not (field-sizing: content) { c { color: red; } }
  }`
  expect(supports(run(css, baselineYear(2025)), true)).toEqual([
    "not (corner-shape: squircle)",
    "not (field-sizing: content)",
    "not (field-sizing: content)",
  ])
  const root = run(css, baselineYear(2026))
  expect(supports(root, true)).toEqual(["not (corner-shape: squircle)"])
  expect(root.nodes).toHaveLength(1)
})

test("each year keeps a subset of the year before it", () => {
  const kept = baselineYears().map((year) =>
    supports(run(compatCss, baselineYear(year)), true),
  )
  expect(kept[0]).toEqual(conditions)
  kept.slice(1).forEach((year, index) => {
    expect(kept[index]).toEqual(expect.arrayContaining(year))
  })
})

test("the plugins leave the component @supports alone", () => {
  const css = `${read("components/text-field.css")}\n${compatCss}`
  const own = supports(postcss.parse(css), false)
  expect(own.length).toBeGreaterThan(0)
  const stripped = run(css, withoutCompat())
  expect(supports(stripped, false)).toEqual(own)
  expect(supports(stripped, true)).toEqual([])
  for (const year of baselineYears()) {
    expect(supports(run(css, baselineYear(year)), false)).toEqual(own)
  }
})

test("the browser support guide lists every compat file", () => {
  const guide = readFileSync("src/docs/guide/browser-support.astro", "utf8")
  expect(
    compatFiles.filter(
      (file) => !guide.includes(`<code>css/compat/${file}</code>`),
    ),
  ).toEqual([])
})
