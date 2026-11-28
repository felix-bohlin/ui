import type { Part } from "./component-fragment.ts"
import { VOID_ELEMENTS } from "./html-tokens.mjs"

export type Attribute =
  | { kind: "boolean"; name: string }
  | { code: string; kind: "expression"; name: string }
  | { kind: "static"; name: string; value: string }

type ElementAttribute =
  | Attribute
  | { code: string; kind: "class" | "spread"; name?: undefined }

export type ElementNode = {
  attributes: ElementAttribute[]
  children: MarkupNode[]
  component?: unknown
  custom?: boolean
  foreign?: boolean
  tag: string
  type: "element"
  variable?: boolean
}

export type EachNode = {
  children: MarkupNode[]
  index?: string
  item: string
  key: string
  list: string
  row: MarkupNode
  type: "each"
}

export type LoopHead = Pick<EachNode, "index" | "item" | "key" | "list">

type IfNode = {
  alternate?: MarkupNode[]
  consequent: MarkupNode[]
  test: string
  type: "if"
}

export type TextNode = { inline?: boolean; type: "text"; value: string }

export type MarkupNode =
  | EachNode
  | ElementNode
  | IfNode
  | TextNode
  | { children: MarkupNode[]; type: "fragment" }
  | { code: string; type: "expression" }
  | { fallback: MarkupNode[]; name: string; type: "slot" }

export type TextPart =
  | { role: string; run: string; text?: undefined }
  | { text: string }

export type Edges = { leading?: boolean; trailing?: boolean }

export const attributeNode = (
  item: { kind: string; name: string; value: string },
  refuse: (what: string) => Error,
): Attribute => {
  if (item.name.includes(":")) throw refuse(`the directive ${item.name}`)
  if (item.kind === "quoted") {
    return { kind: "static", name: item.name, value: item.value }
  }
  if (item.kind === "empty") return { kind: "boolean", name: item.name }
  if (item.kind === "expression") {
    return { code: item.value.trim(), kind: "expression", name: item.name }
  }
  if (item.kind === "template-literal") {
    return { code: `\`${item.value}\``, kind: "expression", name: item.name }
  }
  throw refuse(`the attribute ${item.name}`)
}

export type EmptyElements = keyof typeof EMPTY_ELEMENTS

export type ElementParts = {
  attributes: Part
  content?: Part
  emptyElements: EmptyElements
}

const EMPTY_ELEMENTS = {
  components: (node: ElementNode) => !!(node.component || node.variable),
  every: () => true,
  foreign: (node: ElementNode) =>
    !!(node.component || node.variable || node.foreign),
}

export const selfCloses = (
  node: ElementNode,
  content: string,
  emptyElements: EmptyElements,
) =>
  VOID_ELEMENTS.has(node.tag) ||
  (!content.trim() && EMPTY_ELEMENTS[emptyElements](node))

export const runLayout = ({ run }: { run: string }) =>
  run === "\n\n" ? "\n\n" : run.includes("\n") ? "\n" : " "

export const atEdge = (
  parts: readonly unknown[],
  position: number,
  { leading, trailing }: Edges,
) => (leading && position === 0) || (trailing && position === parts.length - 1)
