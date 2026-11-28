import {
  asFragment,
  code,
  fragment,
  needsOf,
  type Part,
} from "./component-fragment.ts"
import { attributeText, markupAttribute } from "./example-encoders.mjs"
import {
  atEdge,
  type Attribute,
  type EachNode,
  type Edges,
  type ElementNode,
  type MarkupNode,
  runLayout,
  selfCloses,
  type TextNode,
  type TextPart,
} from "./markup-nodes.ts"

export const SPACE = '{{ " " }}'

export const sourceText = (node: TextNode) =>
  node.value === " " || node.inline ? SPACE : node.value

export const renderedText = (
  parts: readonly TextPart[],
  position: Edges & { between?: boolean; blank?: boolean },
) =>
  parts
    .map((part, at) => {
      if (part.text !== undefined) return part.text
      if (part.role !== "space") return runLayout(part)
      return position.between || (position.blank && atEdge(parts, at, position))
        ? SPACE
        : " "
    })
    .join("")

export const vueInterpolation = (value: Part) => code`{{ ${value} }}`

const escaped = (value: Part) => {
  const written = asFragment(value)
  return fragment(attributeText(written.code), needsOf([written]))
}

export const vueBinding = (attribute: string, value: Part) =>
  code`${attribute}="${escaped(value)}"`

export const vueAttribute = (
  item: Attribute,
  value?: Part,
  { slotted = false } = {},
) => {
  if (item.kind === "boolean") return item.name
  if (item.kind === "static") {
    return slotted && item.name === "value"
      ? vueBinding(
          ":value.attr",
          `'${item.value.replaceAll("\\", "\\\\").replaceAll("'", "\\'")}'`,
        )
      : markupAttribute(item.name, item.value, false)
  }
  return vueBinding(`:${item.name}`, value ?? item.code)
}

export const vueFor = ({
  index,
  item,
  key,
  list,
}: Pick<EachNode, "index" | "item" | "key" | "list">) =>
  code`${vueBinding("v-for", code`${index ? `(${item}, ${index})` : item} in ${list}`)} ${vueBinding(":key", key)}`

export const vueTemplate = (clause: Part, content: Part) =>
  code`<template ${clause}>${content}</template>`

const VUE_UNKNOWN_TAGS = new Set(["search"])

export const slotInputs = (children: readonly MarkupNode[]): Set<ElementNode> =>
  new Set(
    children.flatMap((child) =>
      child.type === "fragment"
        ? [...slotInputs(child.children)]
        : child.type === "element" &&
            child.tag === "input" &&
            !child.component &&
            !child.attributes.some((item) => item.name === "readonly")
          ? [child]
          : [],
    ),
  )

export const vueElement = (
  node: ElementNode,
  {
    attributes,
    content = "",
    emptyElements,
    is = node.tag,
  }: {
    attributes: Part
    content?: Part
    emptyElements: Parameters<typeof selfCloses>[2]
    is?: Part
  },
) => {
  const named =
    node.custom || (!node.component && VUE_UNKNOWN_TAGS.has(node.tag))
  const tag = node.variable || named ? "component" : node.tag
  const listed = asFragment(attributes)
  const open = code`<${tag}${node.variable ? code` ${vueBinding(":is", is)}` : named ? ` is="${node.tag}"` : ""}${listed.code ? code` ${listed}` : ""}`
  return selfCloses(node, asFragment(content).code, emptyElements)
    ? code`${open} />`
    : code`${open}>${content}</${tag}>`
}
