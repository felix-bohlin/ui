import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { ssr } from "@solidjs/web"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import { frameworkProps, splitUnion } from "../../src/utils/component-source"
import { createIdGenerator } from "../../src/utils/id"
import { normalize } from "./normalize"
import {
  contentOf,
  reactNodes,
  renderSolid,
  type SolidComponent,
  TEXT,
  vueNodes,
} from "./renderers"

const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)
const astroPaths = Object.keys(
  import.meta.glob("../../packages/opui/components/*/*.astro"),
)
const reactComponents = import.meta.glob<{
  default: ComponentType<Record<string, unknown>>
}>("../../packages/opui/components/*/*.react.tsx")
const solidComponents = import.meta.glob<{ default: SolidComponent }>(
  "../../packages/opui/components/*/*.solid.tsx",
)
const svelteComponents = import.meta.glob<{
  default: SvelteComponent<Record<string, unknown>>
}>("../../packages/opui/components/*/*.svelte")
const vueComponents = import.meta.glob<VueComponent>(
  "../../packages/opui/components/*/*.vue",
  { import: "default" },
)

const FRAMEWORKS = ["astro", "react", "solid", "svelte", "vue"] as const

type Framework = (typeof FRAMEWORKS)[number]

const SAMPLES: Record<string, unknown> = {
  "MenuItem[]": [{ label: "A", value: "a" }],
  "RangeItem[]": [{ label: "A", value: 1 }],
  "SelectItem[]": [{ label: "A", value: "a" }],
  HTMLInputTypeAttribute: "text",
  boolean: true,
  number: 2,
  string: TEXT,
}

const REACT_NAMES: Record<string, string> = {
  checked: "defaultChecked",
  class: "className",
  for: "htmlFor",
  value: "defaultValue",
}

const SLOT_TYPE = /\b(Element|ReactNode|Snippet)\b/

const PRELOAD = /<link rel="preload" as="image"[^>]*\/>/g

const KNOWN_DIFFERENCES: Record<string, string> = {}

const loaderOf = <T>(modules: Record<string, () => Promise<T>>, name: string) =>
  Object.entries(modules).find(([path]) =>
    path
      .replace(/\.(react|solid)\.tsx$/, ".tsx")
      .endsWith(`/${name}.${path.split(".").at(-1)}`),
  )?.[1]

const valuesOf = (type: string) =>
  [
    ...new Set(
      splitUnion(type).flatMap((member) => {
        const literal = /^"(.*)"$/.exec(member)
        if (literal) return [literal[1]]
        if (member === "true") return [true]
        return member in SAMPLES ? [SAMPLES[member]] : []
      }),
    ),
  ].slice(0, 6)

const slotsOf = (api: ComponentApi) =>
  [
    ...new Set([
      ...(api.slots ?? []).map(({ name }) => name),
      ...api.parts.flatMap((part) => part.slots ?? []),
    ]),
  ].toSorted()

const propName = (framework: Framework, name: string) =>
  framework === "react" ? (REACT_NAMES[name] ?? name) : name

type Case = {
  component: string
  name: string
  props: Record<string, unknown>
  slots: string[]
  types: Record<Framework, Map<string, string>>
}

const casesOf = (api: ComponentApi): Case[] => {
  const types = Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, frameworkProps(api, framework)]),
  ) as Record<Framework, Map<string, string>>
  const shared = [...types.astro]
    .filter(
      ([name, type]) =>
        !SLOT_TYPE.test(type) &&
        FRAMEWORKS.every((framework) => {
          const own = types[framework].get(propName(framework, name))
          return own !== undefined && !SLOT_TYPE.test(own)
        }),
    )
    .toSorted(([a], [b]) => a.localeCompare(b, "en"))
  const slots = slotsOf(api)
  const base = { component: api.component, types }
  return [
    { ...base, name: "nothing", props: {}, slots: [] },
    { ...base, name: "every slot", props: {}, slots },
    { ...base, name: 'class="Text"', props: { class: TEXT }, slots },
    ...shared.flatMap(([name, type]) =>
      valuesOf(type).map((value) => ({
        ...base,
        name: `${name}=${JSON.stringify(value)}`,
        props: { [name]: value },
        slots,
      })),
    ),
  ]
}

const partCasesOf = (api: ComponentApi): Case[] =>
  api.parts
    .filter(
      (part) =>
        part.component &&
        !Object.values(apis).some(
          (other) => other.component === part.component,
        ),
    )
    .flatMap((part) => {
      const slots = (part.slots ?? ["default"]).toSorted()
      const base = {
        component: part.component!,
        types: Object.fromEntries(
          FRAMEWORKS.map((framework) => [framework, new Map()]),
        ) as Record<Framework, Map<string, string>>,
      }
      return [
        { ...base, name: "nothing", props: {}, slots: [] },
        { ...base, name: "every slot", props: {}, slots },
        { ...base, name: 'class="Text"', props: { class: TEXT }, slots },
      ]
    })

const CASES = Object.values(apis)
  .toSorted((a, b) => a.component.localeCompare(b.component, "en"))
  .flatMap((api) => [...casesOf(api), ...partCasesOf(api)])

let renderer: Awaited<ReturnType<typeof createRenderer>>

beforeAll(async () => {
  renderer = await createRenderer()
}, 60_000)

afterAll(() => renderer.close())

const fixtureOf = (component: string, slots: string[]) => {
  const path = astroPaths.find((candidate) =>
    candidate.endsWith(`/${component}.astro`),
  )
  if (!path) return undefined
  const content = JSON.stringify(contentOf(component))
  const children = slots
    .map((slot) =>
      slot === "default"
        ? `<Fragment set:html={${content}} />`
        : `<Fragment slot="${slot}" set:html={${content}} />`,
    )
    .join("")
  return {
    file: `tests/unit/.contract/${component}.${slots.length ? "slots" : "bare"}.astro`,
    source: `---\nimport Component from "${path.replace("../../", "../../../")}"\n\nconst { props } = Astro.props\n---\n\n<Component {...props}>${children}</Component>\n`,
  }
}

const slotValue = (
  framework: Framework,
  type: string | undefined,
  nodes: () => unknown,
) => {
  if (framework === "svelte") {
    return createRawSnippet(() => ({ render: () => String(nodes()) }))
  }
  return type?.includes("=>") ? nodes : nodes()
}

const render: Record<Framework, (entry: Case) => Promise<string | undefined>> =
  {
    astro: async ({ component, props, slots }) => {
      const fixture = fixtureOf(component, slots)
      if (!fixture) return undefined
      return renderer.renderSource(fixture.file, fixture.source, {
        locals: {
          $id: createIdGenerator(),
          framework: "astro",
          link: (path: string) => path,
        },
        props: { props },
      })
    },
    react: async ({ component, props, slots, types }) => {
      const load = loaderOf(reactComponents, component)
      if (!load) return undefined
      const { default: Component } = await load()
      const nodes = () => reactNodes(contentOf(component))
      return renderReact(
        createElement(Component, {
          ...Object.fromEntries(
            Object.entries(props).map(([key, value]) => [
              propName("react", key),
              value,
            ]),
          ),
          ...Object.fromEntries(
            slots
              .filter(
                (slot) => slot === "default" || types.react.has(slotProp(slot)),
              )
              .map((slot) => [
                slotProp(slot),
                slotValue("react", types.react.get(slotProp(slot)), nodes),
              ]),
          ),
        }),
      ).replace(PRELOAD, "")
    },
    solid: async ({ component, props, slots, types }) => {
      const load = loaderOf(solidComponents, component)
      if (!load) return undefined
      const { default: Component } = await load()
      return renderSolid(Component, {
        ...props,
        ...Object.fromEntries(
          slots
            .filter(
              (slot) => slot === "default" || types.solid.has(slotProp(slot)),
            )
            .map((slot) => [
              slotProp(slot),
              slotValue("solid", types.solid.get(slotProp(slot)), () =>
                ssr(contentOf(component)),
              ),
            ]),
        ),
      })
    },
    svelte: async ({ component, props, slots, types }) => {
      const load = loaderOf(svelteComponents, component)
      if (!load) return undefined
      const { default: Component } = await load()
      return renderSvelte(Component, {
        props: {
          ...props,
          ...Object.fromEntries(
            slots
              .filter(
                (slot) =>
                  slot === "default" || types.svelte.has(slotProp(slot)),
              )
              .map((slot) => [
                slotProp(slot),
                slotValue("svelte", undefined, () => contentOf(component)),
              ]),
          ),
        },
      }).body
    },
    vue: async ({ component, props, slots }) => {
      const load = loaderOf(vueComponents, component)
      if (!load) return undefined
      const Component = await load()
      return renderVue(
        createSSRApp({
          render: () =>
            h(
              Component,
              props,
              Object.fromEntries(
                slots.map((slot) => [
                  slot,
                  () => vueNodes(contentOf(component)),
                ]),
              ),
            ),
        }),
      )
    },
  }

const emptyClass = (markup: string) => /\sclass=""/.test(markup)

describe("every component renders the same in Astro, React, Solid, Svelte and Vue", () => {
  test("covers the components with a matrix of props and slots", () => {
    expect(
      new Set(CASES.map(({ component }) => component)).size,
    ).toBeGreaterThan(60)
    expect(CASES.length).toBeGreaterThan(300)
  })

  test.each(CASES)("$component with $name", async (entry) => {
    const expected = await render.astro(entry)
    if (expected === undefined) return
    const reference = normalize(expected)
    expect
      .soft(
        emptyClass(expected),
        `${entry.component} with ${entry.name}: astro renders class=""`,
      )
      .toBe(false)
    for (const framework of FRAMEWORKS.filter((id) => id !== "astro")) {
      const actual = await render[framework](entry)
      if (actual === undefined) continue
      expect
        .soft(
          emptyClass(actual),
          `${entry.component} with ${entry.name}: ${framework} renders class="", which the parity check drops; bind the class only when it isn't empty (classAttrs() in Vue)`,
        )
        .toBe(false)
      const key = `${entry.component} ${entry.name} ${framework}`
      if (key in KNOWN_DIFFERENCES) {
        expect
          .soft(
            normalize(actual) === reference,
            `${key} is in KNOWN_DIFFERENCES (${KNOWN_DIFFERENCES[key]}) but no longer differs; delete it`,
          )
          .toBe(false)
        continue
      }
      expect
        .soft(
          normalize(actual),
          `${entry.component} with ${entry.name}: ${framework} differs from Astro`,
        )
        .toBe(reference)
    }
  })

  test("a sample the check must flag: an empty class attribute", () => {
    expect(emptyClass('<h2 class="">Title</h2>')).toBe(true)
    expect(emptyClass('<h2 class="ui-title">Title</h2>')).toBe(false)
  })

  test("a sample the check must flag: a class one framework forgets", () => {
    expect(
      normalize(
        '<label class="ui-checkbox ui-card"><input type="checkbox"></label>',
      ),
    ).not.toBe(
      normalize('<label class="ui-checkbox"><input type="checkbox"></label>'),
    )
  })
})
