import { matches, select } from "hast-util-select"
import rehypeParse from "rehype-parse"
import { unified } from "unified"
import { HEADING_EXCLUSION_SELECTOR } from "./headings"

type Nodes = NonNullable<Parameters<typeof matches>[1]>
type Element = Extract<Nodes, { type: "element" }>

const parser = unified().use(rehypeParse, { fragment: true })
const EXCLUDED = `${HEADING_EXCLUSION_SELECTOR}, [hidden]`
const HEADINGS = new Set(["h2", "h3", "h4", "h5", "h6"])

const escapeAttribute = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")

const textContent = (node: Nodes): string =>
  node.type === "text"
    ? node.value
    : "children" in node
      ? node.children.map(textContent).join("")
      : ""

function headingId(heading: Element, parent: Element | undefined) {
  if (heading.properties.id) return String(heading.properties.id)
  const first = parent?.children.find((child) => child.type === "element")
  return parent?.tagName === "section" && first === heading
    ? String(parent.properties.id ?? "")
    : ""
}

function headingEdits(
  html: string,
  heading: Element,
  parent: Element | undefined,
) {
  const start = heading.position?.start.offset
  const end = heading.position?.end.offset
  const endTag = `</${heading.tagName}>`
  if (start === undefined || end === undefined) return []
  if (html.slice(end - endTag.length, end).toLowerCase() !== endTag) return []

  const close = end - endTag.length
  const open = heading.children[0]?.position?.start.offset
  const text = textContent(heading).replace(/\s+/g, " ").trim()
  const id = headingId(heading, parent)
  const srOnly = matches(".ui-sr-only", heading)
  const edits = []

  if (open !== undefined && !select("span", heading)) {
    if (heading.tagName === "h2" && !srOnly) {
      edits.push({
        at: start + 1 + heading.tagName.length,
        text: ` data-heading="${escapeAttribute(text)}"`,
      })
    }
    edits.push({ at: open, text: "<span>" }, { at: close, text: "</span>" })
  }

  if (id && !srOnly && !select(".header-anchor", heading)) {
    edits.push({
      at: close,
      text: `<a class="header-anchor" href="#${escapeAttribute(id)}" aria-label="Permalink to &quot;${escapeAttribute(text)}&quot;">&#8203;</a>`,
    })
  }

  return edits
}

export function addHeadingAnchors(html: string) {
  const edits: ReturnType<typeof headingEdits> = []

  const visit = (node: Nodes, parent?: Element) => {
    if (node.type === "element") {
      if (matches(EXCLUDED, node)) return
      if (HEADINGS.has(node.tagName)) {
        edits.push(...headingEdits(html, node, parent))
        return
      }
    }
    if ("children" in node) {
      for (const child of node.children) {
        visit(child, node.type === "element" ? node : undefined)
      }
    }
  }

  visit(parser.parse(html))

  let last = 0
  let result = ""
  for (const { at, text } of edits.toSorted((a, b) => a.at - b.at)) {
    result += html.slice(last, at) + text
    last = at
  }
  return result + html.slice(last)
}
