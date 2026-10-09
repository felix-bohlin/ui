import { parseFragment } from "parse5"
import type { DefaultTreeAdapterMap } from "parse5"

type Node = DefaultTreeAdapterMap["node"]
type Element = DefaultTreeAdapterMap["element"]

const DROPPED_ELEMENTS = new Set(["script", "style"])

const DROPPED_ATTRIBUTE =
  /^(data-astro-|data-svelte-|data-v-|data-vue-|data-server-rendered$|on[a-z]+$|slot$)/

const ID_REFERENCE_ATTRIBUTES = new Set([
  "anchor",
  "aria-activedescendant",
  "aria-controls",
  "aria-describedby",
  "aria-details",
  "aria-errormessage",
  "aria-flowto",
  "aria-labelledby",
  "aria-owns",
  "commandfor",
  "for",
  "form",
  "headers",
  "interestfor",
  "list",
  "popovertarget",
])

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
])

const GENERATED_NAME = /^(v-[\w-]+|[a-z][a-z-]*-s?\d+)$/

const isElement = (node: Node): node is Element => "tagName" in node

const childrenOf = (node: Node) =>
  "content" in node && node.nodeName === "template"
    ? node.content.childNodes
    : "childNodes" in node
      ? node.childNodes
      : []

const collectIds = (nodes: Node[], ids: Map<string, string>) => {
  for (const node of nodes) {
    if (!isElement(node) || DROPPED_ELEMENTS.has(node.tagName)) continue
    const id = node.attrs.find((attr) => attr.name === "id")?.value
    if (id && !ids.has(id)) ids.set(id, `id-${ids.size + 1}`)
    const name = node.attrs.find((attr) => attr.name === "name")?.value
    if (name && GENERATED_NAME.test(name) && !ids.has(`name:${name}`)) {
      ids.set(`name:${name}`, `name-${ids.size + 1}`)
    }
    collectIds(childrenOf(node), ids)
  }
}

const normalizeAttribute = (
  name: string,
  value: string,
  ids: Map<string, string>,
) => {
  if (name === "class") {
    return value.split(/\s+/).filter(Boolean).toSorted().join(" ")
  }
  if (name === "id") return ids.get(value) ?? value
  if (name === "name") return ids.get(`name:${value}`) ?? value
  if (ID_REFERENCE_ATTRIBUTES.has(name)) {
    return value
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => ids.get(token) ?? token)
      .join(" ")
  }
  if (name === "href" && value.startsWith("#")) {
    return `#${ids.get(value.slice(1)) ?? value.slice(1)}`
  }
  if (name === "style") {
    return value
      .split(";")
      .map((declaration) => declaration.trim().replace(/\s*:\s*/, ": "))
      .filter(Boolean)
      .map((declaration) => {
        const colon = declaration.indexOf(":")
        return colon === -1
          ? declaration
          : `${declaration.slice(0, colon).trim()}: ${declaration.slice(colon + 1).trim()}`
      })
      .join("; ")
  }
  return value.trim()
}

const serialize = (
  nodes: Node[],
  ids: Map<string, string>,
  depth: number,
): string[] => {
  const indent = "  ".repeat(depth)
  const lines: string[] = []

  for (const node of nodes) {
    if (node.nodeName === "#text" && "value" in node) {
      const text = node.value.replace(/\s+/g, " ").trim()
      if (text) lines.push(indent + text)
      continue
    }
    if (!isElement(node) || DROPPED_ELEMENTS.has(node.tagName)) continue

    const attrs = node.attrs
      .filter((attr) => !DROPPED_ATTRIBUTE.test(attr.name))
      .map((attr) => ({
        name: attr.name,
        value: normalizeAttribute(attr.name, attr.value, ids),
      }))
      .filter(
        (attr) =>
          !((attr.name === "class" || attr.name === "style") && !attr.value),
      )
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .map((attr) => (attr.value ? `${attr.name}="${attr.value}"` : attr.name))

    const open = `<${[node.tagName, ...attrs].join(" ")}>`
    if (VOID_ELEMENTS.has(node.tagName)) {
      lines.push(indent + open)
      continue
    }

    const children = serialize(childrenOf(node), ids, depth + 1)
    if (children.length === 0) {
      lines.push(`${indent}${open}</${node.tagName}>`)
    } else if (children.length === 1 && !children[0].trim().startsWith("<")) {
      lines.push(`${indent}${open}${children[0].trim()}</${node.tagName}>`)
    } else {
      lines.push(indent + open, ...children, `${indent}</${node.tagName}>`)
    }
  }

  return lines
}

export const normalize = (html: string) => {
  const fragment = parseFragment(html)
  const ids = new Map<string, string>()
  collectIds(fragment.childNodes, ids)
  return serialize(fragment.childNodes, ids, 0).join("\n") + "\n"
}
