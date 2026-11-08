import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { readFileSync } from "node:fs"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { readComponent } from "../../scripts/component-reader.mjs"
import { REACT_ATTRIBUTE_NAMES } from "../../scripts/component-shared.mjs"
import {
  reactPropsOf,
  resolveReactProp,
} from "../../scripts/example-react-props.mjs"
import { tagAttrs } from "../../packages/opui/components/tag"
import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import { frameworkProps, splitUnion } from "../../src/utils/component-source"
import { createIdGenerator } from "../../src/utils/id"
import { normalize } from "./normalize"
import { contentOf, reactNodes, TEXT, vueNodes } from "./renderers"

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
const svelteComponents = import.meta.glob<{
  default: SvelteComponent<Record<string, unknown>>
}>("../../packages/opui/components/*/*.svelte")
const vueComponents = import.meta.glob<VueComponent>(
  "../../packages/opui/components/*/*.vue",
  { import: "default" },
)

const FRAMEWORKS = ["astro", "react", "svelte", "vue"] as const

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

const SLOT_TYPE = /\b(ReactNode|Snippet)\b/

const PRELOAD = /<link rel="preload" as="image"[^>]*\/>/g

const KNOWN_DIFFERENCES: Record<string, string> = {}

const KNOWN_ATTRIBUTES: Record<string, { attribute: string; reason: string }> =
  {
    "SortableTable react": {
      attribute: "data-hydrating",
      reason:
        "the element ignores header clicks until React has hydrated the table and attached onSort",
    },
  }

const withoutAttribute = (markup: string, attribute: string) =>
  markup.replace(new RegExp(`\\s${attribute}(?:="[^"]*")?(?=[\\s>])`), "")

const loaderOf = <T>(modules: Record<string, () => Promise<T>>, name: string) =>
  Object.entries(modules).find(([path]) =>
    path
      .replace(/\.react\.tsx$/, ".tsx")
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
  plain?: Omit<Case, "plain">
  props: Record<string, unknown>
  reactNames?: Record<string, string>
  slots: string[]
  types: Record<Framework, Map<string, string>>
}

type TemplateNode = {
  attributes?: { code?: string; kind: string; name?: string }[]
  children?: TemplateNode[]
  alternate?: TemplateNode[]
  component?: boolean
  consequent?: TemplateNode[]
  custom?: boolean
  fallback?: TemplateNode[]
  tag?: string
  variable?: boolean
}

const TAG_ATTRIBUTES = Object.keys({
  ...tagAttrs("a", true, "#"),
  ...tagAttrs("button"),
})

const UNDEFINED_CASE = "every attribute as undefined"

const attributesAtRisk = async (path: string) => {
  const file = new URL(path, import.meta.url).pathname
  const component = await readComponent(readFileSync(file, "utf8"), file)
  const destructured = new Set(
    component.props.map(({ prop }: { prop: string }) => prop),
  )
  const names = new Map<string, string>()
  const visit = (nodes: TemplateNode[] = []) => {
    for (const node of nodes) {
      const attributes = node.attributes ?? []
      const carriesRest = attributes.some(
        (item) => item.kind === "spread" && item.code === component.rest,
      )
      if (carriesRest && !node.component) {
        for (const item of attributes) {
          const bound =
            item.kind === "spread"
              ? item.code?.includes("tagAttrs(")
                ? TAG_ATTRIBUTES
                : []
              : item.kind === "class" || !item.name
                ? []
                : [item.name]
          for (const name of bound.filter((name) => !destructured.has(name))) {
            names.set(
              name,
              REACT_ATTRIBUTE_NAMES[
                name as keyof typeof REACT_ATTRIBUTE_NAMES
              ] ??
                (node.variable || node.custom
                  ? name
                  : (resolveReactProp(
                      reactPropsOf(node.tag, false) ?? new Map(),
                      name,
                    ) ?? name)),
            )
          }
        }
      }
      visit(node.children)
      visit(node.consequent)
      visit(node.alternate)
      visit(node.fallback)
    }
  }
  visit(component.tree)
  return names
}

const AT_RISK = new Map(
  await Promise.all(
    astroPaths.map(
      async (path) =>
        [
          path
            .split("/")
            .at(-1)!
            .replace(/\.astro$/, ""),
          await attributesAtRisk(path),
        ] as const,
    ),
  ),
)

const withUndefinedAttributes = (cases: Case[]) =>
  cases.flatMap((entry) => {
    const names = AT_RISK.get(entry.component)
    if (!names?.size) return [entry]
    return [
      entry,
      {
        ...entry,
        name: `${entry.name}, ${UNDEFINED_CASE}`,
        plain: entry,
        props: {
          ...Object.fromEntries(
            [...names.keys()].map((name) => [name, undefined]),
          ),
          ...entry.props,
        },
        reactNames: Object.fromEntries(names),
      },
    ]
  })

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
  .flatMap((api) =>
    withUndefinedAttributes([...casesOf(api), ...partCasesOf(api)]),
  )

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
    react: async ({ component, props, reactNames, slots, types }) => {
      const load = loaderOf(reactComponents, component)
      if (!load) return undefined
      const { default: Component } = await load()
      const nodes = () => reactNodes(contentOf(component))
      return renderReact(
        createElement(Component, {
          ...Object.fromEntries(
            Object.entries(props).map(([key, value]) => [
              reactNames?.[key] ?? propName("react", key),
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

describe("every component renders the same in Astro, React, Svelte and Vue", () => {
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
    if (entry.plain) {
      const plain = await render.astro(entry.plain)
      expect
        .soft(
          reference,
          `${entry.component} with ${entry.name}: astro drops an attribute the component sets. An attribute a caller passes as undefined or null never removes an attribute the component sets, in any framework: filter the spread with defined() from attrs.ts`,
        )
        .toBe(normalize(plain!))
    }
    expect
      .soft(
        emptyClass(expected),
        `${entry.component} with ${entry.name}: astro renders class=""`,
      )
      .toBe(false)
    for (const framework of FRAMEWORKS.filter((id) => id !== "astro")) {
      const rendered = await render[framework](entry)
      if (rendered === undefined) continue
      const known = KNOWN_ATTRIBUTES[`${entry.component} ${framework}`]
      if (known) {
        expect
          .soft(
            withoutAttribute(rendered, known.attribute) !== rendered,
            `${entry.component} ${framework} is in KNOWN_ATTRIBUTES with ${known.attribute} (${known.reason}) but no longer renders it; delete it`,
          )
          .toBe(true)
      }
      const actual = known
        ? withoutAttribute(rendered, known.attribute)
        : rendered
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
          entry.plain
            ? `${entry.component} with ${entry.name}: ${framework} differs from Astro. An attribute a caller passes as undefined or null never removes an attribute the component sets, in any framework: the compiler filters a rest spread that follows an attribute with defined() from attrs.ts`
            : `${entry.component} with ${entry.name}: ${framework} differs from Astro`,
        )
        .toBe(reference)
    }
  })

  test("a sample the check must flag: an empty class attribute", () => {
    expect(emptyClass('<h2 class="">Title</h2>')).toBe(true)
    expect(emptyClass('<h2 class="ui-title">Title</h2>')).toBe(false)
  })

  test("a sample the check must flag: a known attribute the framework no longer renders", () => {
    const markup =
      '<opui-sortable-table class="ui-sortable-table" data-hydrating="">'
    expect(withoutAttribute(markup, "data-hydrating")).toBe(
      '<opui-sortable-table class="ui-sortable-table">',
    )
    expect(withoutAttribute(markup, "data-sorted")).toBe(markup)
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
