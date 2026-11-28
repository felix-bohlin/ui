import { asFragment, code, type Part } from "./component-fragment.ts"
import { markupAttribute } from "./example-encoders.mjs"
import {
  atEdge,
  type Attribute,
  type EachNode,
  type Edges,
  type ElementNode,
  runLayout,
  selfCloses,
  type TextNode,
  type TextPart,
} from "./markup-nodes.ts"

export const SPACE = '{" "}'

export const sourceText = (node: TextNode) =>
  node.value === " " ? SPACE : node.value

export const renderedText = (parts: readonly TextPart[], position: Edges) =>
  parts
    .map((part, at) => {
      if (part.text !== undefined) return part.text
      if (part.role !== "space") return runLayout(part)
      return atEdge(parts, at, position) ? SPACE : " "
    })
    .join("")

const NUMERIC_ATTRIBUTES = new Set([
  "colspan",
  "maxlength",
  "minlength",
  "rows",
  "rowspan",
  "span",
  "tabindex",
])

export const svelteAttribute = (
  node: ElementNode,
  item: Attribute,
  value?: Part,
) => {
  if (item.kind === "boolean") return item.name
  if (item.kind === "static") {
    return node.component &&
      NUMERIC_ATTRIBUTES.has(item.name) &&
      /^-?\d+$/.test(item.value)
      ? `${item.name}={${item.value}}`
      : markupAttribute(item.name, item.value, true)
  }
  return code`${item.name}={${value ?? item.code}}`
}

export const svelteExpression = (value: Part) => code`{${value}}`

export const svelteRender = (
  name: string,
  { argument = "", optional = false } = {},
) => `{@render ${name}${optional ? "?." : ""}(${argument})}`

export const svelteSnippet = (name: string, content: Part) =>
  code`{#snippet ${name}()}${content}{/snippet}`

export const svelteIf = (test: Part, consequent: Part, alternate?: Part) =>
  alternate === undefined
    ? code`{#if ${test}}${consequent}{/if}`
    : code`{#if ${test}}${consequent}{:else}${alternate}{/if}`

export const svelteEach = (
  { index, item, key, list }: Pick<EachNode, "index" | "item" | "key" | "list">,
  body: Part,
) =>
  code`{#each ${list} as ${item}${index ? `, ${index}` : ""} (${key})}${body}{/each}`

export const svelteElement = (
  node: ElementNode,
  {
    attributes,
    content = "",
    emptyElements,
    rewrite = (value: string): Part => value,
  }: {
    attributes: Part
    content?: Part
    emptyElements: Parameters<typeof selfCloses>[2]
    rewrite?: (value: string) => Part
  },
) => {
  const tag = node.variable ? "svelte:element" : node.tag
  const listed = asFragment(attributes)
  const open = code`<${tag}${node.variable ? ` this={${node.tag}}` : ""}${listed.code ? code` ${listed}` : ""}`
  const progress =
    node.tag === "progress"
      ? node.attributes.find(
          (item) => item.kind === "expression" && item.name === "value",
        )
      : undefined
  const keyed = (written: Part) =>
    progress?.kind === "expression"
      ? code`{#key ${rewrite(progress.code)} == null}\n${written}\n{/key}`
      : written
  return keyed(
    selfCloses(node, asFragment(content).code, emptyElements)
      ? code`${open} />`
      : code`${open}>${content}</${tag}>`,
  )
}
