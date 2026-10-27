import { experimental_AstroContainer as AstroContainer } from "astro/container"
import type { AstroInstance } from "astro"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
)
const components = import.meta.glob<unknown>(
  "../../packages/opui/components/*/*.{astro,react.tsx,svelte,vue}",
  { import: "default" },
)

const content = "<span>Content</span>"
const container = await AstroContainer.create()
const renderers = {
  astro: (component: unknown, props: Record<string, unknown>) =>
    container.renderToString(component as AstroInstance["default"], {
      props,
      slots: { default: content },
    }),
  "react.tsx": async (component: unknown, props: Record<string, unknown>) =>
    renderReact(
      createElement(
        component as ComponentType,
        props,
        createElement("span", null, "Content"),
      ),
    ),
  svelte: async (component: unknown, props: Record<string, unknown>) =>
    renderSvelte(component as SvelteComponent, {
      props: {
        ...props,
        children: createRawSnippet(() => ({ render: () => content })),
      },
    }).body,
  vue: (component: unknown, props: Record<string, unknown>) =>
    renderVue(
      createSSRApp({
        render: () =>
          h(component as VueComponent, props, {
            default: () => h("span", "Content"),
          }),
      }),
    ),
}

const aligned = apis.flatMap((api) => {
  const option = api.options.find(({ prop }) => prop === "align")
  return option?.values && api.source
    ? [{ api, option, values: option.values }]
    : []
})
type Entry = (typeof aligned)[number]

const parts = Map.groupBy(
  aligned,
  ({ api }) => api.root.selector.match(/\.ui-[a-z0-9-]+/)?.[0] ?? "",
)

const documentedProblems = (part: string, entries: Entry[]) =>
  new Set(
    entries.map(({ option, values }) =>
      JSON.stringify([option.default, values]),
    ),
  ).size > 1
    ? [
        `${part}: ${entries
          .map(
            ({ api, option, values }) =>
              `${api.component} defaults to ${option.default} with ${JSON.stringify(values)}`,
          )
          .join(", ")}`,
      ]
    : []

const renderedProblems = (
  part: string,
  values: Entry["values"],
  value: string | undefined,
  rendered: [string, string | undefined][],
) => {
  const modifier = value ? values[value] : null
  const found = rendered.flatMap(([file, classes]) =>
    !classes
      ? [`${file}: renders no ${part}`]
      : Object.values(values)
          .filter((other) => typeof other === "string")
          .filter(
            (other) =>
              classes.split(" ").includes(other.slice(1)) !==
              (other === modifier),
          )
          .map(
            (other) =>
              `${file} align=${value}: ${other === modifier ? "misses" : "renders"} ${other}`,
          ),
  )
  const classes = new Set(rendered.map(([, classes]) => classes))
  return classes.size > 1
    ? [
        ...found,
        `${part} align=${value}: ${rendered.map(([file, classes]) => `${file} renders "${classes}"`).join(", ")}`,
      ]
    : found
}

const classesOf = (html: string, part: string) =>
  [...html.matchAll(/class="([^"]*)"/g)]
    .map(([, classes]) => classes.split(/\s+/).toSorted())
    .find((classes) => classes.includes(part.slice(1)))
    ?.join(" ")

const renderPart = async (part: string, entries: Entry[]) => {
  const { values } = entries[0]
  const found: string[] = []
  for (const value of [undefined, ...Object.keys(values)]) {
    const rendered = await Promise.all(
      entries.flatMap(({ api }) =>
        Object.entries(renderers).map(async ([extension, render]) => {
          const file = `${api.source}/${api.component}.${extension}`
          const component =
            await components[`../../packages/opui/components/${file}`]()
          const html = await render(component, { align: value, id: "x" })
          return [file, classesOf(html, part)] as [string, string | undefined]
        }),
      ),
    )
    found.push(...renderedProblems(part, values, value, rendered))
  }
  return found
}

const message =
  "align has one default per part, wherever the part appears: every component with the part documents the same default and values in api.ts, and renders them in every framework"

test("the align parts include the actions and the footer", () => {
  expect(parts.get(".ui-actions")?.length).toBeGreaterThan(1)
  expect(parts.get(".ui-footer")?.length).toBeGreaterThan(1)
})

test("the align check flags a part with two defaults", () => {
  const [accordion, card] = parts.get(".ui-actions")!
  expect(
    documentedProblems(".ui-actions", [
      accordion,
      {
        ...card,
        option: { ...card.option, default: '"start"' },
        values: { end: ".ui-align-end", start: null },
      },
    ]).join("\n"),
  ).toContain('CardActions defaults to "start"')
  expect(documentedProblems(".ui-actions", [accordion, card])).toEqual([])
})

test("the align check flags a framework that renders another default", () => {
  const values = { end: null, start: ".ui-align-start" }
  expect(
    renderedProblems(".ui-actions", values, undefined, [
      ["Card/CardActions.astro", "ui-actions"],
      ["Card/CardActions.vue", "ui-actions ui-align-start"],
    ]),
  ).toEqual([
    "Card/CardActions.vue align=undefined: renders .ui-align-start",
    '.ui-actions align=undefined: Card/CardActions.astro renders "ui-actions", Card/CardActions.vue renders "ui-actions ui-align-start"',
  ])
  expect(
    renderedProblems(".ui-actions", values, "start", [
      ["Card/CardActions.astro", "ui-actions"],
    ]),
  ).toEqual(["Card/CardActions.astro align=start: misses .ui-align-start"])
  expect(
    renderedProblems(".ui-actions", values, "start", [
      ["Card/CardActions.astro", "ui-actions ui-align-start"],
      ["Card/CardActions.vue", "ui-actions ui-align-start"],
    ]),
  ).toEqual([])
})

test.each([...parts].toSorted(([a], [b]) => a.localeCompare(b)))(
  "align has one default per part: %s",
  async (part, entries) => {
    expect(
      [
        ...documentedProblems(part, entries),
        ...(await renderPart(part, entries)),
      ],
      message,
    ).toEqual([])
  },
)
