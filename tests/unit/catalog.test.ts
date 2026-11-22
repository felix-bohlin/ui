import { existsSync } from "node:fs"
import { expect, test } from "vitest"
import { loadCatalog } from "../../scripts/catalog.mjs"
import {
  catalogOf,
  kebab,
  pageOfStylesheet,
  stylesheetsOf,
} from "../../src/component-api/catalog"
import { catalog } from "../../src/component-api/catalog.glob"
import type { ComponentApi } from "../../src/component-api/types"

const api = (fields: Partial<ComponentApi>) =>
  ({ component: "Sample", parts: [], root: {}, ...fields }) as ComponentApi

const sample = catalogOf(
  [
    ["tabs-item", api({ component: "TabsItem", page: "tabs", source: "Tabs" })],
    ["tabs", api({ component: "Tabs", css: ["tabs", "list"], source: "Tabs" })],
    ["spinner", api({ component: "Spinner" })],
    ["text-field", api({ component: "TextField", source: "TextField" })],
  ],
  ["control-group", "spinner", "table", "tabs", "text-field"],
)

test("an api is on its own page unless it names another", () => {
  expect(sample.apis.map(({ folder, page }) => [folder, page])).toEqual([
    ["spinner", "spinner"],
    ["tabs", "tabs"],
    ["tabs-item", "tabs"],
    ["text-field", "text-field"],
  ])
  expect(sample.apisOf("tabs").map(({ api }) => api.component)).toEqual([
    "Tabs",
    "TabsItem",
  ])
})

test("a page has the sources and stylesheets of its apis, each once", () => {
  expect(sample.sourcesOf("tabs")).toEqual(["Tabs"])
  expect(sample.stylesheetsOf("tabs")).toEqual(["list", "tabs"])
  expect(sample.stylesheetsOf("text-field")).toEqual(["text-field"])
  expect(sample.stylesheetsOf("spinner")).toEqual([])
  expect(sample.stylesheetsOf("nope")).toEqual([])
})

test("an api without css is styled by its kebab-cased source", () => {
  expect(stylesheetsOf({ source: "TextField" })).toEqual(["text-field"])
  expect(stylesheetsOf({ css: ["card"], source: "Dialog" })).toEqual(["card"])
  expect(stylesheetsOf({})).toEqual([])
  expect(kebab("OneTimeCode")).toBe("one-time-code")
})

test("a component name maps to the page of its api, its listed page or the page it starts with", () => {
  expect(sample.pageOfComponent("TabsItem")).toBe("tabs")
  expect(sample.pageOfComponent("ButtonGroup")).toBe("control-group")
  expect(sample.pageOfComponent("TableColumn")).toBe("table")
  expect(sample.pageOfComponent("Nope")).toBe(undefined)
})

test("a page owns its docs, examples, api folders, components, elements and own stylesheets", () => {
  const files = catalogOf(
    [
      [
        "tabs",
        api({
          component: "Tabs",
          css: ["tabs", "list"],
          elements: [{ members: [], tag: "opui-tabs" }],
          source: "Tabs",
        }),
      ],
      [
        "tabs-item",
        api({ component: "TabsItem", page: "tabs", source: "Tabs" }),
      ],
    ],
    ["tabs"],
  ).filesOf("tabs")
  expect(files).toEqual([
    { path: "src/component-api/tabs", type: "api" },
    { path: "src/component-api/tabs-item", type: "api" },
    { path: "packages/opui/components/Tabs", type: "component" },
    { path: "packages/opui/elements/tabs.js", type: "component" },
    { path: "packages/opui/css/components/tabs.css", type: "css" },
    { path: "src/component-examples/tabs", type: "docs" },
    { path: "src/docs/components/tabs.astro", type: "docs" },
  ])
})

test("a stylesheet belongs to the page named after it, unless another page holds its component", () => {
  expect(pageOfStylesheet("button")).toBe("button")
  expect(pageOfStylesheet("text-field")).toBe("field")
})

test("a page owns the stylesheet of its component when it's named after another page", () => {
  const files = catalogOf(
    [
      [
        "field",
        api({
          component: "Field",
          css: ["select", "text-field"],
          source: "Field",
        }),
      ],
    ],
    ["field", "select", "text-field"],
  ).filesOf("field")
  expect(files.filter(({ type }) => type === "css")).toEqual([
    { path: "packages/opui/css/components/text-field.css", type: "css" },
  ])
})

test("every file a docs page owns exists", () => {
  const pages = [...new Set(catalog.apis.map(({ page }) => page))]
  expect(
    pages.flatMap((page) =>
      catalog
        .filesOf(page)
        .filter(({ path }) => !existsSync(path))
        .map(({ path }) => `${page}: ${path}`),
    ),
  ).toEqual([])
})

const pagesOf = (apis: typeof catalog.apis) =>
  apis.map(({ folder, page }) => [folder, page])

test("the site and the scripts load the same catalog", async () => {
  const node = await loadCatalog()
  expect(catalog.apis.length).toBeGreaterThan(0)
  expect(pagesOf(node.apis)).toEqual(pagesOf(catalog.apis))
  expect(node.pageOfComponent("Link")).toBe(catalog.pageOfComponent("Link"))
  expect(node.pageOfComponent("AvatarGroup")).toBe("avatar")
})
