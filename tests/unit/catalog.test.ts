import { existsSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"
import { loadCatalog } from "../../scripts/catalog.mjs"
import {
  catalogOf,
  kebab,
  stylesheetsOf,
} from "../../src/component-api/catalog"
import { catalog } from "../../src/component-api/catalog.glob"
import { pages } from "../../src/component-api/pages"
import type { ComponentApi, DocsPage } from "../../src/component-api/types"

const api = (fields: Partial<ComponentApi>) =>
  ({ component: "Sample", parts: [], root: {}, ...fields }) as ComponentApi

const noSources = { examples: () => [], stylesheet: () => undefined }

const sampleOf = (
  entries: (readonly [string, ComponentApi])[],
  pages: Record<string, DocsPage>,
  fields: Partial<Parameters<typeof catalogOf>[0]> = {},
) =>
  catalogOf({
    apis: entries,
    exports: {},
    pages,
    sources: noSources,
    ...fields,
  })

const sample = sampleOf(
  [
    ["tabs-item", api({ component: "TabsItem", page: "tabs", source: "Tabs" })],
    ["tabs", api({ component: "Tabs", css: ["tabs", "list"], source: "Tabs" })],
    ["spinner", api({ component: "Spinner" })],
    ["text-field", api({ component: "TextField", source: "TextField" })],
  ],
  {
    "control-group": { title: "Control group" },
    spinner: { title: "Spinner" },
    table: { title: "Table" },
    tabs: { title: "Tabs" },
    "text-field": { title: "Text field" },
  },
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

test("a page is named by its title, any other slug by its words", () => {
  expect(sample.pages).toEqual([
    "control-group",
    "spinner",
    "table",
    "tabs",
    "text-field",
  ])
  expect(sample.nameOf("text-field")).toBe("Text field")
  expect(sample.nameOf("tabs-item")).toBe("Tabs item")
})

test("a page shows the apis it lists in order, then its own, each titled by its component", () => {
  const catalog = sampleOf(
    [
      ["button", api({ component: "Button", source: "Button" })],
      [
        "control-group",
        api({ component: "ControlGroup", source: "ControlGroup" }),
      ],
      [
        "one-time-code",
        api({ component: "OneTimeCode", source: "OneTimeCode" }),
      ],
      [
        "control-group-item",
        api({ component: "ControlGroupItem", page: "control-group" }),
      ],
    ],
    {
      button: { title: "Button" },
      "control-group": { apis: ["control-group", "button"], title: "Group" },
      "one-time-code": { title: "One-time code" },
    },
  )
  expect(
    catalog
      .shownApisOf("control-group")
      .map(({ folder, title }) => [folder, title]),
  ).toEqual([
    ["control-group", "Group API"],
    ["button", "Button API"],
    ["control-group-item", "Control group item API"],
  ])
  expect(catalog.shownApisOf("one-time-code")[0].title).toBe(
    "One-time code API",
  )
})

test("a page installs its main stylesheet, its other ones with their elements, its other elements and then the stylesheets of other pages", () => {
  const catalog = sampleOf(
    [
      ["card", api({ component: "Card", source: "Card" })],
      [
        "character-count",
        api({
          component: "CharacterCount",
          elements: [{ members: [], tag: "opui-character-count" }],
          page: "form",
        }),
      ],
      [
        "checkbox",
        api({
          component: "Checkbox",
          css: ["card", "checkbox", "choice"],
          source: "Checkbox",
        }),
      ],
      ["field-group", api({ component: "FieldGroup", css: ["form"] })],
      ["form", api({ component: "Form", source: "Form" })],
      [
        "select-all",
        api({
          component: "SelectAll",
          css: ["select-all"],
          elements: [{ members: [], tag: "opui-select-all" }],
          page: "checkbox",
        }),
      ],
      [
        "toast",
        api({
          component: "Toaster",
          elements: [{ members: [], tag: "opui-toaster" }],
          source: "Toaster",
        }),
      ],
    ],
    {
      card: { title: "Card" },
      checkbox: {
        apis: ["checkbox", "field-group", "select-all"],
        title: "Checkbox",
        uses: ["character-count"],
      },
      form: { title: "Form" },
      toast: { title: "Toast" },
    },
  )
  const files = (page: string) =>
    catalog
      .installOf(page)
      .map(({ dependency, file }) => `${file}${dependency ? "*" : ""}`)
  expect(files("checkbox")).toEqual([
    "checkbox.css",
    "choice.css",
    "select-all.css",
    "select-all.js",
    "character-count.js",
    "card.css*",
    "form.css*",
  ])
  expect(files("toast")).toEqual(["toaster.css", "toaster.js"])
  expect(files("nope")).toEqual([])
  expect(catalog.ownerOf("toaster")).toBe("toast")
  expect(catalog.ownerOf("choice")).toBe(undefined)
  expect(catalog.dependenciesOf("checkbox")).toEqual(["card", "form"])
  expect(catalog.dependentsOf("card")).toEqual(["checkbox"])
  expect(catalog.dependentsOf("checkbox")).toEqual([])
})

test("a page in a family takes its base's group and imports its base's component and the ones it uses", () => {
  const catalog = sampleOf(
    [
      ["character-count", api({ component: "CharacterCount", page: "field" })],
      ["field", api({ component: "Field", source: "Field" })],
      [
        "password-toggle",
        api({
          component: "PasswordToggle",
          page: "text-field",
          parts: [
            { component: "Button", description: "", selector: ".ui-button" },
            {
              component: "TextFieldIcon",
              description: "",
              selector: ".ui-icon",
            },
          ],
          source: "PasswordToggle",
        }),
      ],
    ],
    {
      button: { title: "Button" },
      field: { title: "Field" },
      textarea: { base: "field", title: "Textarea", uses: ["character-count"] },
      "text-field": { base: "field", title: "Text field" },
    },
    {
      exports: {
        astro: ["Button", "CharacterCount", "Field", "PasswordToggle"],
        react: ["Field", "PasswordToggle", "TextFieldIcon"],
      },
    },
  )
  expect(catalog.families).toEqual(["field"])
  expect(catalog.familyOf("text-field")).toBe("field")
  expect(catalog.familyOf("field")).toBe("field")
  expect(catalog.familyOf("button")).toBe(undefined)
  expect(catalog.importsOf("text-field", "react")).toEqual([
    "Field",
    "PasswordToggle",
    "TextFieldIcon",
  ])
  expect(catalog.importsOf("text-field", "nunjucks")).toEqual([
    "Field",
    "PasswordToggle",
  ])
  expect(catalog.importsOf("field", "astro")).toEqual([
    "CharacterCount",
    "Field",
  ])
  expect(catalog.importsOf("textarea", "astro")).toEqual([
    "CharacterCount",
    "Field",
  ])
  expect(catalog.importsOf("text-field", "vue")).toEqual([])
})

test("a page uses the features of the rules its examples can match, the HTML features of its examples and its exceptions", () => {
  const css = {
    dialog:
      ".ui-dialog { overflow: clip; &:has(> .ui-header) { gap: 0; } } .ui-sheet { scrollbar-gutter: stable; }",
    menu: ".ui-menu:popover-open { opacity: 1; }",
  } as Record<string, string>
  const catalog = sampleOf(
    [
      ["dialog", api({ component: "Dialog", source: "Dialog" })],
      ["menu", api({ component: "Menu", source: "Menu" })],
    ],
    {
      dialog: {
        features: { core: ["scrollbar-gutter"], ignore: ["has"] },
        title: "Dialog",
      },
      menu: { title: "Menu" },
    },
    {
      sources: {
        examples: (page) =>
          page === "dialog"
            ? ['<dialog closedby="any" class="ui-dialog"></dialog>']
            : [],
        stylesheet: (name) => css[name],
      },
    },
  )
  expect(catalog.detectedFeaturesOf("dialog")).toEqual([
    "dialog-closedby",
    "has",
    "overflow-clip",
  ])
  expect(catalog.featuresOf("dialog")).toEqual([
    "dialog-closedby",
    "overflow-clip",
    "scrollbar-gutter",
  ])
  expect(catalog.featuresOf("menu")).toEqual(["popover"])
})

test("a page owns its docs, examples, api folders, components, elements and own stylesheets", () => {
  const files = sampleOf(
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
    { tabs: { title: "Tabs" } },
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

test("every docs page has page data, and every page data a docs page", () => {
  expect(catalog.pages).toEqual(
    readdirSync("src/docs/components")
      .filter((file) => file.endsWith(".astro"))
      .map((file) => file.replace(/\.astro$/, ""))
      .toSorted(),
  )
})

test("the page data names apis, bases, examples and files that exist", () => {
  expect(
    catalog.pages.flatMap((page) => [
      ...catalog
        .shownApisOf(page)
        .filter(({ folder }) => !existsSync(`src/component-api/${folder}`))
        .map(({ folder }) => `${page}: api ${folder}`),
      ...((pages as Record<string, DocsPage>)[page]?.uses ?? [])
        .filter((folder) => !existsSync(`src/component-api/${folder}`))
        .map((folder) => `${page}: uses ${folder}`),
      ...[catalog.baseOf(page) ?? []]
        .flat()
        .filter((base) => !catalog.pages.includes(base))
        .map((base) => `${page}: base ${base}`),
      ...catalog
        .examplesOf(page)
        .filter(
          (name) => !existsSync(`src/component-examples/${page}/${name}.html`),
        )
        .map((name) => `${page}: example ${name}`),
      ...catalog
        .installOf(page)
        .filter(({ file, type }) =>
          type === "css"
            ? !existsSync(`packages/opui/css/components/${file}`)
            : !existsSync(`packages/opui/elements/${file}`),
        )
        .map(({ file }) => `${page}: ${file}`),
    ]),
  ).toEqual([])
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

const answersOf = (loaded: typeof catalog) =>
  loaded.pages.map((page) => ({
    apis: loaded.shownApisOf(page).map(({ folder, title }) => [folder, title]),
    dependents: loaded.dependentsOf(page),
    family: loaded.familyOf(page),
    features: loaded.featuresOf(page),
    imports: ["astro", "nunjucks", "react", "solid", "svelte", "vue"].map(
      (framework) => loaded.importsOf(page, framework),
    ),
    install: loaded.installOf(page),
    page,
  }))

test("the site and the scripts load the same catalog", async () => {
  const node = await loadCatalog()
  expect(catalog.apis.length).toBeGreaterThan(0)
  expect(pagesOf(node.apis)).toEqual(pagesOf(catalog.apis))
  expect(node.pageOfComponent("Link")).toBe(catalog.pageOfComponent("Link"))
  expect(node.pageOfComponent("AvatarGroup")).toBe("avatar")
  expect(answersOf(node)).toEqual(answersOf(catalog))
  expect(catalog.importsOf("text-field", "react")).toContain("Field")
  expect(catalog.featuresOf("tooltip").length).toBeGreaterThan(0)
})
