import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { ssr } from "@solidjs/web"
import { createElement, type ComponentType, type ReactNode } from "react"
import { renderToString as renderReact } from "react-dom/server"
import { createRawSnippet, type Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, h, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { REACT_ATTRIBUTE_NAMES } from "../../scripts/example-react-props.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { slotProp } from "../../src/component-api/frameworks"
import { renderSolid as renderSolidRoot } from "../../src/components/Example/render-solid"
import { TEXT } from "./case-table"

type Node = ReturnType<typeof parseHtml>[number]

type Props = Record<string, unknown>

export type Slots = Record<string, string>

export type SolidComponent<P = Props> = (props: P) => unknown

export { TEXT }

export const CALLER_VALUE = "Caller"

const SLOT_CONTENT: Record<string, string> = {
  Table: "<tbody><tr><td>Text</td></tr></tbody>",
  TableBody: "<tr><td>Text</td></tr>",
  TableColumnGroup: "<col>",
  TableFoot: "<tr><td>Text</td></tr>",
  TableHead: "<tr><td>Text</td></tr>",
  TableRow: "<td>Text</td>",
}

export const contentOf = (component: string) => SLOT_CONTENT[component] ?? TEXT

const attributesOf = (node: Node & { type: "element" }) =>
  Object.fromEntries(
    node.attrs.map(({ name, value }: { name: string; value: string }) => [
      name,
      value,
    ]),
  )

const REACT_BOOLEANS = new Set([
  "checked",
  "disabled",
  "hidden",
  "inert",
  "multiple",
  "open",
  "required",
  "selected",
])

const styleObject = (style: string) =>
  Object.fromEntries(
    style
      .split(";")
      .map((declaration) => declaration.split(":"))
      .filter(([name, ...value]) => name.trim() && value.length)
      .map(([name, ...value]) => [
        name.trim().startsWith("--")
          ? name.trim()
          : name
              .trim()
              .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
        value.join(":").trim(),
      ]),
  )

const reactAttributes = (node: Node & { type: "element" }) =>
  Object.fromEntries(
    Object.entries(attributesOf(node)).map(([name, value]) => [
      REACT_ATTRIBUTE_NAMES[name as keyof typeof REACT_ATTRIBUTE_NAMES] ?? name,
      name === "style" ? styleObject(value) : REACT_BOOLEANS.has(name) || value,
    ]),
  )

const reactTree = (nodes: Node[]): ReactNode[] =>
  nodes.flatMap((node, index) =>
    node.type === "text"
      ? [node.value]
      : node.type === "element"
        ? [
            createElement(
              node.tag,
              { ...reactAttributes(node), key: index },
              ...reactTree(node.children),
            ),
          ]
        : [],
  )

const vueTree = (nodes: Node[]): unknown[] =>
  nodes.flatMap((node) =>
    node.type === "text"
      ? [node.value]
      : node.type === "element"
        ? [h(node.tag, attributesOf(node), vueTree(node.children))]
        : [],
  )

export const reactNodes = (html: string) => reactTree(parseHtml(html))

export const vueNodes = (html: string) => vueTree(parseHtml(html))

const slotProps = (slots: Slots, value: (html: string) => unknown) =>
  Object.fromEntries(
    Object.entries(slots).map(([name, html]) => [slotProp(name), value(html)]),
  )

let container: AstroContainer | undefined

export const renderSolid = <P extends Props>(
  Component: SolidComponent<P>,
  props = {} as P,
) => renderSolidRoot(Component as never, "solid-", props)

export const render = {
  astro: async (
    component: unknown,
    props: Props = {},
    slots: Slots = {},
    locals?: NonNullable<
      Parameters<AstroContainer["renderToString"]>[1]
    >["locals"],
  ) => {
    container ??= await AstroContainer.create()
    return container.renderToString(
      component as Parameters<AstroContainer["renderToString"]>[0],
      { locals, props, slots },
    )
  },
  react: async (component: unknown, props: Props = {}, slots: Slots = {}) =>
    renderReact(
      createElement(component as ComponentType<Props>, {
        ...props,
        ...slotProps(slots, reactNodes),
      }),
    ),
  solid: async (component: unknown, props: Props = {}, slots: Slots = {}) =>
    renderSolid(component as SolidComponent, {
      ...props,
      ...slotProps(slots, (html) => ssr(html)),
    }),
  svelte: async (component: unknown, props: Props = {}, slots: Slots = {}) =>
    renderSvelte(component as SvelteComponent<Props>, {
      props: {
        ...props,
        ...slotProps(slots, (html) =>
          createRawSnippet(() => ({ render: () => html })),
        ),
      },
    }).body,
  vue: (component: unknown, props: Props = {}, slots: Slots = {}) =>
    renderVue(
      createSSRApp({
        render: () =>
          h(
            component as VueComponent,
            props,
            Object.fromEntries(
              Object.entries(slots).map(([name, html]) => [
                name,
                () => vueNodes(html),
              ]),
            ),
          ),
      }),
    ),
}
