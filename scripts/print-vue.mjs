import { asFragment, code, fragment, needsOf } from "./component-fragment.mjs"
import { attributeText, markupAttribute } from "./example-encoders.mjs"
import { atEdge, runLayout, selfCloses } from "./markup-nodes.mjs"

export const SPACE = '{{ " " }}'

export const sourceText = (node) =>
  node.value === " " || node.inline ? SPACE : node.value

export const renderedText = (parts, position) =>
  parts
    .map((part, at) => {
      if (part.text !== undefined) return part.text
      if (part.role !== "space") return runLayout(part)
      return position.between || (position.blank && atEdge(parts, at, position))
        ? SPACE
        : " "
    })
    .join("")

export const vueInterpolation = (value) => code`{{ ${value} }}`

const escaped = (value) => {
  const written = asFragment(value)
  return fragment(attributeText(written.code), needsOf([written]))
}

export const vueBinding = (attribute, value) =>
  code`${attribute}="${escaped(value)}"`

export const vueAttribute = (item, value, { slotted = false } = {}) => {
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

export const vueFor = ({ index, item, key, list }) =>
  code`${vueBinding("v-for", code`${index ? `(${item}, ${index})` : item} in ${list}`)} ${vueBinding(":key", key)}`

export const vueTemplate = (clause, content) =>
  code`<template ${clause}>${content}</template>`

const VUE_UNKNOWN_TAGS = new Set(["search"])

export const slotInputs = (children) =>
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
  node,
  { attributes, content = "", emptyElements, is = node.tag },
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
