import { renderedText } from "../../scripts/example-display.mjs"
import { declarations, mergeText } from "../../scripts/example-html.mjs"
import { parseHtml, VOID_ELEMENTS } from "../../scripts/html-tokens.mjs"

type Node = ReturnType<typeof parseHtml>[number]

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

const ASCII_WHITESPACE = /[\t\n\f\r ]+/

const GENERATED_NAME = /^(v-[\w-]+|[a-z][a-z-]*-\d+|([a-z][a-z-]*-)?_R_\w+_)$/

const attribute = (node: Node, name: string) =>
  node.attrs.find((attr: { name: string }) => attr.name === name)?.value as
    string | undefined

const collectIds = (nodes: Node[], ids: Map<string, string>) => {
  for (const node of nodes) {
    if (node.type !== "element" || DROPPED_ELEMENTS.has(node.tag)) continue
    const id = attribute(node, "id")
    if (id && !ids.has(id)) ids.set(id, `id-${ids.size + 1}`)
    const name = attribute(node, "name")
    if (name && GENERATED_NAME.test(name) && !ids.has(`name:${name}`)) {
      ids.set(`name:${name}`, `name-${ids.size + 1}`)
    }
    collectIds(node.children, ids)
  }
}

const withoutComments = (nodes: Node[]): Node[] =>
  mergeText(
    nodes
      .filter((node) => node.type !== "comment")
      .map((node) =>
        node.type === "element"
          ? { ...node, children: withoutComments(node.children) }
          : node,
      ),
  )

const normalizeAttribute = (
  name: string,
  value: string,
  ids: Map<string, string>,
) => {
  if (name === "class") {
    return value.split(ASCII_WHITESPACE).filter(Boolean).toSorted().join(" ")
  }
  if (name === "id") return ids.get(value) ?? value
  if (name === "name") return ids.get(`name:${value}`) ?? value
  if (ID_REFERENCE_ATTRIBUTES.has(name)) {
    return value
      .split(ASCII_WHITESPACE)
      .filter(Boolean)
      .map((token) => ids.get(token) ?? token)
      .join(" ")
  }
  if (name === "href" && value.startsWith("#")) {
    return `#${ids.get(value.slice(1)) ?? value.slice(1)}`
  }
  if (name === "style") return declarations(value)
  return value.trim()
}

const textLine = (text: string) => {
  const escaped = (part: string) =>
    part
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(" ", "&nbsp;")
  if (text === " ") return "␣"
  const lead = text.startsWith(" ") ? "␣" : ""
  const trail = text.endsWith(" ") ? "␣" : ""
  return (
    lead + escaped(text.slice(lead.length, text.length - trail.length)) + trail
  )
}

const verbatimLine = (text: string) =>
  JSON.stringify(text).replaceAll(" ", "\\u00a0")

type Rendered = ReturnType<typeof renderedText>

const serialize = (
  nodes: Node[],
  context: { ids: Map<string, string>; rendered: Rendered },
  depth: number,
): string[] => {
  const indent = "  ".repeat(depth)
  const lines: string[] = []
  for (const node of nodes) {
    if (node.type === "comment") {
      lines.push(`${indent}<!--${node.value}-->`)
      continue
    }
    if (node.type === "text") {
      const rendered = context.rendered.get(node)
      if (!rendered?.text) continue
      lines.push(
        indent +
          (rendered.verbatim
            ? verbatimLine(rendered.text)
            : textLine(rendered.text)),
      )
      continue
    }
    if (DROPPED_ELEMENTS.has(node.tag)) continue

    const attrs = node.attrs
      .filter((attr: { name: string }) => !DROPPED_ATTRIBUTE.test(attr.name))
      .map((attr: { name: string; value: string }) => ({
        name: attr.name,
        value: normalizeAttribute(attr.name, attr.value, context.ids),
      }))
      .filter(
        (attr: { name: string; value: string }) =>
          !((attr.name === "class" || attr.name === "style") && !attr.value),
      )
      .toSorted((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
      )
      .map((attr: { name: string; value: string }) =>
        attr.value ? `${attr.name}="${attr.value}"` : attr.name,
      )

    const open = `<${[node.tag, ...attrs].join(" ")}>`
    if (VOID_ELEMENTS.has(node.tag)) {
      lines.push(indent + open)
      continue
    }

    const children = serialize(node.children, context, depth + 1)
    if (children.length === 0) {
      lines.push(`${indent}${open}</${node.tag}>`)
    } else if (children.length === 1 && !children[0].trim().startsWith("<")) {
      lines.push(`${indent}${open}${children[0].trim()}</${node.tag}>`)
    } else {
      lines.push(indent + open, ...children, `${indent}</${node.tag}>`)
    }
  }
  return lines
}

export const idsOf = (html: string) => {
  const ids = new Map<string, string>()
  collectIds(parseHtml(html), ids)
  return [...ids.keys()].filter((key) => !key.startsWith("name:"))
}

export const normalize = (
  html: string,
  { comments = false, css = [] as string[] } = {},
) => {
  const parsed = parseHtml(html)
  const nodes = comments ? parsed : withoutComments(parsed)
  const ids = new Map<string, string>()
  collectIds(nodes, ids)
  const rendered = renderedText(nodes, { css })
  return serialize(nodes, { ids, rendered }, 0).join("\n") + "\n"
}
