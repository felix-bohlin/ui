import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { ssr } from "@solidjs/web"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { readFileSync } from "node:fs"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { readComponent } from "../../scripts/component-reader.mjs"
import { reactAttributeName } from "../../scripts/example-react-props.mjs"
import { tagAttrs } from "../../packages/opui/components/tag"
import { slotProp } from "../../src/component-api/frameworks"
import { typedAttributes } from "../../src/utils/component-source"
import { exampleExtension } from "../../src/utils/framework"
import { createIdGenerator } from "../../src/utils/id"
import {
  apis,
  type Case,
  casesOf,
  FRAMEWORKS,
  type Framework,
  partCasesOf,
  reactProps,
} from "./component-cases"
import { normalize } from "./normalize"
import {
  CALLER_VALUE,
  contentOf,
  reactNodes,
  render as renderers,
  renderSolid,
  type SolidComponent,
  vueNodes,
} from "./renderers"

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

const PRELOAD = /<link rel="preload" as="image"[^>]*\/>/g

const KNOWN_DIFFERENCES: Record<string, string> = {}

const KNOWN_ATTRIBUTES: Record<
  string,
  {
    attribute: string
    reason: string
    when?: (props: Record<string, unknown>) => boolean
  }
> = {
  Callout: {
    attribute: "data-hydrating",
    reason:
      "the element ignores the close button until the framework has hydrated the callout and attached its dismiss handler",
    when: ({ closeButton }) => Boolean(closeButton),
  },
  FileUpload: {
    attribute: "data-hydrating",
    reason:
      "the element holds picked files back and ignores the remove buttons until the framework has hydrated the root and attached its select and remove handlers",
  },
  Reactions: {
    attribute: "data-hydrating",
    reason:
      "the element asks for nothing on a click until the framework has hydrated the reactions and attached its reaction handler",
  },
  SortableTable: {
    attribute: "data-hydrating",
    reason:
      "the element ignores header clicks until the framework has hydrated the table and attached its sort handler",
  },
}

const withoutAttribute = (markup: string, attribute: string) =>
  markup.replace(new RegExp(`\\s${attribute}(?:="[^"]*")?(?=[\\s>])`), "")

const loaderOf = <T>(
  modules: Record<string, () => Promise<T>>,
  name: string,
  framework: Framework,
) =>
  Object.entries(modules).find(([path]) =>
    path.endsWith(`/${name}.${exampleExtension(framework)}`),
  )?.[1]

type TemplateNode = {
  attributes?: { code?: string; kind: string; name?: string }[]
  children?: TemplateNode[]
  alternate?: TemplateNode[]
  component?: boolean
  consequent?: TemplateNode[]
  custom?: boolean
  fallback?: TemplateNode[]
  item?: string
  list?: string
  tag?: string
  type?: string
  variable?: boolean
}

const TAG_ATTRIBUTES = Object.keys({
  ...tagAttrs("a", true, "#"),
  ...tagAttrs("button"),
})

const UNDEFINED_CASE = "every attribute as undefined"

const ITEM_UNDEFINED_CASE = "every item attribute as undefined"

const BEFORE_SPREAD_CASE = "a value for every attribute set before the spread"

const risksOf = (
  component: Awaited<ReturnType<typeof readComponent>>,
  typed: Set<string>,
) => {
  const destructured = new Set(
    component.props.map(({ prop }: { prop: string }) => prop),
  )
  const names = new Map<string, string>()
  const beforeSpread = new Set<string>()
  const visit = (nodes: TemplateNode[] = []) => {
    for (const node of nodes) {
      const attributes = node.attributes ?? []
      const restAt = attributes.findIndex(
        (item) => item.kind === "spread" && item.code === component.rest,
      )
      if (restAt !== -1 && !node.component) {
        for (const [index, item] of attributes.entries()) {
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
              reactAttributeName(
                node.variable || node.custom ? undefined : node.tag,
                name,
              ),
            )
            if (index < restAt && typed.has(name)) beforeSpread.add(name)
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
  return { beforeSpread, names }
}

const attributesAtRisk = async (path: string) => {
  const file = new URL(path, import.meta.url).pathname
  const component = await readComponent(readFileSync(file, "utf8"), file)
  return risksOf(
    component,
    typedAttributes(
      { component: componentNameOf(path), source: path.split("/").at(-2) },
      "astro",
    ),
  )
}

const itemAttributesAtRisk = async (path: string) => {
  const file = new URL(path, import.meta.url).pathname
  const component = await readComponent(readFileSync(file, "utf8"), file)
  const lists = new Map<string, Set<string>>()
  type Scope = { destructured: Set<string>; list: string; rest: string }
  const visit = (nodes: TemplateNode[] = [], scope?: Scope) => {
    for (const node of nodes) {
      const rest =
        node.type === "each" ? /\.\.\.(\w+)\s*\}$/.exec(node.item!) : null
      const inner: Scope | undefined = rest
        ? {
            destructured: new Set(
              node
                .item!.replace(/[{}\s]/g, "")
                .split(",")
                .filter((name) => name && !name.startsWith("..."))
                .map((name) => name.split(/[:=]/)[0]),
            ),
            list: /^\w+/.exec(node.list!)![0],
            rest: rest[1],
          }
        : scope
      const attributes = node.attributes ?? []
      if (
        scope &&
        attributes.some(
          (item) => item.kind === "spread" && item.code === scope.rest,
        )
      ) {
        const names = lists.get(scope.list) ?? new Set()
        for (const item of attributes) {
          const bound =
            item.kind === "spread"
              ? item.code?.includes("tagAttrs(")
                ? TAG_ATTRIBUTES
                : []
              : item.kind === "class" || !item.name
                ? []
                : [item.name]
          for (const name of bound) {
            if (!scope.destructured.has(name)) names.add(name)
          }
        }
        lists.set(scope.list, names)
      }
      visit(node.children, inner)
      visit(node.consequent, inner)
      visit(node.alternate, inner)
      visit(node.fallback, inner)
    }
  }
  visit(component.tree)
  return lists
}

const componentNameOf = (path: string) =>
  path
    .split("/")
    .at(-1)!
    .replace(/\.astro$/, "")

const AT_RISK = new Map(
  await Promise.all(
    astroPaths.map(
      async (path) =>
        [componentNameOf(path), await attributesAtRisk(path)] as const,
    ),
  ),
)

const ITEMS_AT_RISK = new Map(
  await Promise.all(
    astroPaths.map(
      async (path) =>
        [componentNameOf(path), await itemAttributesAtRisk(path)] as const,
    ),
  ),
)

const withAttributeCases = (cases: Case[]) =>
  cases.flatMap((entry) => {
    const { beforeSpread, names } = AT_RISK.get(entry.component) ?? {}
    const lists = [...(ITEMS_AT_RISK.get(entry.component) ?? [])].filter(
      ([list, keys]) => keys.size && Array.isArray(entry.props[list]),
    )
    return [
      entry,
      ...(names?.size
        ? [
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
        : []),
      ...(names && beforeSpread?.size
        ? [
            {
              ...entry,
              beforeSpread: true,
              name: `${entry.name}, ${BEFORE_SPREAD_CASE}`,
              props: {
                ...Object.fromEntries(
                  [...beforeSpread].map((name) => [name, CALLER_VALUE]),
                ),
                ...entry.props,
              },
              reactNames: Object.fromEntries(names),
            },
          ]
        : []),
      ...lists.map(([list, keys]) => ({
        ...entry,
        name: `${entry.name}, ${ITEM_UNDEFINED_CASE}`,
        plain: entry,
        props: {
          ...entry.props,
          [list]: (entry.props[list] as object[]).map((item) => ({
            ...Object.fromEntries([...keys].map((key) => [key, undefined])),
            ...item,
          })),
        },
      })),
    ]
  })

const CASES = Object.values(apis)
  .toSorted((a, b) => a.component.localeCompare(b.component, "en"))
  .flatMap((api) => withAttributeCases([...casesOf(api), ...partCasesOf(api)]))

let renderer: Awaited<ReturnType<typeof createRenderer>>

beforeAll(async () => {
  renderer = await createRenderer()
}, 60_000)

afterAll(() => renderer?.close())

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
    react: async (entry) => {
      const load = loaderOf(reactComponents, entry.component, "react")
      if (!load) return undefined
      const { default: Component } = await load()
      return renderReact(
        createElement(
          Component,
          reactProps(entry, () => reactNodes(contentOf(entry.component))),
        ),
      ).replace(PRELOAD, "")
    },
    solid: async ({ component, props, slots, types }) => {
      const load = loaderOf(solidComponents, component, "solid")
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
      const load = loaderOf(svelteComponents, component, "svelte")
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
      const load = loaderOf(vueComponents, component, "vue")
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

const emptyAttribute = (markup: string) =>
  /\s(?:class|style)=""/.exec(markup)?.[0].trim()

const repeatedAttribute = (markup: string) => {
  for (const [, attributes] of markup.matchAll(
    /<[a-z][\w-]*((?:\s+[^\s"'=<>/]+(?:="[^"]*")?)*)\s*\/?>/g,
  )) {
    const names = [...attributes.matchAll(/\s([^\s"'=<>/]+)/g)].map(
      ([, name]) => name,
    )
    const repeated = names.find((name, index) => names.indexOf(name) !== index)
    if (repeated) return repeated
  }
  return undefined
}

const BEFORE_SPREAD_RULE =
  "Astro prints an attribute an element writes before {...rest} and then the caller's, and the browser keeps the first, while React, Svelte and Vue render the caller's: where the caller may replace the value, destructure the attribute and fall back with ?? (role={role ?? \"list\"}); where the component's value must stay, leave the attribute out of the types, so no caller passes it, as CheckboxInput does for type"

describe("every component renders the same in Astro, React, Solid, Svelte and Vue", () => {
  test("covers the components with a matrix of props and slots", () => {
    expect(
      new Set(CASES.map(({ component }) => component)).size,
    ).toBeGreaterThan(60)
    expect(CASES.length).toBeGreaterThan(300)
    expect(
      Object.values(apis)
        .filter(
          (api) =>
            api.source &&
            !astroPaths.some((path) =>
              path.endsWith(`/${api.component}.astro`),
            ),
        )
        .map(({ component }) => component),
      "an api.ts with a source documents a component: name it after packages/opui/components/<Component>/<Component>.astro",
    ).toEqual([])
  })

  test.each(CASES)("$component with $name", async (entry) => {
    const expected = await render.astro(entry)
    if (expected === undefined) return
    if (entry.beforeSpread) {
      const repeated = repeatedAttribute(expected)
      expect
        .soft(
          repeated,
          `${entry.component} with ${entry.name}: astro renders ${repeated} twice. ${BEFORE_SPREAD_RULE}`,
        )
        .toBeUndefined()
      if (repeated) return
    }
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
        emptyAttribute(expected),
        `${entry.component} with ${entry.name}: astro renders an empty attribute`,
      )
      .toBeUndefined()
    for (const framework of FRAMEWORKS.filter((id) => id !== "astro")) {
      const rendered = await render[framework](entry)
      expect
        .soft(
          rendered,
          `${entry.component} renders in Astro but has no ${framework} file`,
        )
        .toBeDefined()
      if (rendered === undefined) continue
      const known = KNOWN_ATTRIBUTES[entry.component]
      if (known && (known.when?.(entry.props) ?? true)) {
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
          emptyAttribute(actual),
          `${entry.component} with ${entry.name}: ${framework} renders an empty attribute, which the parity check drops; bind the class and style only when they aren't empty (classAttrs() and styleAttrs() in Vue)`,
        )
        .toBeUndefined()
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
            : entry.beforeSpread
              ? `${entry.component} with ${entry.name}: ${framework} differs from Astro. ${BEFORE_SPREAD_RULE}`
              : `${entry.component} with ${entry.name}: ${framework} differs from Astro`,
        )
        .toBe(reference)
    }
  })

  test("a sample the check must flag: an empty class or style attribute", () => {
    expect(emptyAttribute('<h2 class="">Title</h2>')).toBe('class=""')
    expect(emptyAttribute('<div class="ui-progress" style="">')).toBe(
      'style=""',
    )
    expect(
      emptyAttribute('<h2 class="ui-title" style="color:red;">Title</h2>'),
    ).toBeUndefined()
  })

  test("a sample the check must flag: a known attribute the framework no longer renders", () => {
    const markup =
      '<opui-sortable-table class="ui-sortable-table" data-hydrating="">'
    expect(withoutAttribute(markup, "data-hydrating")).toBe(
      '<opui-sortable-table class="ui-sortable-table">',
    )
    expect(withoutAttribute(markup, "data-sorted")).toBe(markup)
  })

  test("a sample the check must flag: an attribute written before the spread", async () => {
    const component = await readComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, role, ...rest } = Astro.props\n---\n\n<ol class:list={["ui-list", className]} aria-label="List" role={role ?? "list"} title="Title" {...rest} data-index="1">\n  <slot />\n</ol>\n',
      "packages/opui/components/List/Sample.astro",
    )
    expect([
      ...risksOf(component, new Set(["aria-label", "data-index", "role"]))
        .beforeSpread,
    ]).toEqual(["aria-label"])
    expect(
      repeatedAttribute('<ol class="ui-list" role="list" role="log">'),
    ).toBe("role")
    expect(
      repeatedAttribute('<ol class="ui-list" role="log" data-role="list">'),
    ).toBeUndefined()
  })

  test("React and Vue slot content renders the same attributes", async () => {
    const slots = {
      default:
        '<input class="ui-a" disabled style="color: red; --ui-b: 1px"><label for="x">Text</label>',
    }
    expect(normalize(await renderers.react("div", {}, slots))).toBe(
      normalize(await renderers.vue("div", {}, slots)),
    )
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
