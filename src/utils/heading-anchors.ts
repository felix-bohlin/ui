import { parseFragment, type DefaultTreeAdapterTypes } from "parse5"
import { HEADING_EXCLUSION_SELECTOR } from "./headings"

type Element = DefaultTreeAdapterTypes.Element
type Node = DefaultTreeAdapterTypes.Node

const HEADINGS = new Set(["h2", "h3", "h4", "h5", "h6"])
const TOC_HEADINGS = new Set(["h2", "h3", "h4"])

const attribute = (element: Element, name: string) =>
  element.attrs.find((attr) => attr.name === name)?.value

const hasClass = (element: Element, name: string) =>
  (attribute(element, "class") ?? "").split(/\s+/).includes(name)

const isElement = (node: Node): node is Element => "tagName" in node

const excluded = `${HEADING_EXCLUSION_SELECTOR}, [hidden]`
  .split(", ")
  .map((selector) => {
    const [, tag, className, name, value] =
      selector.match(/^(?:([a-z]+)|\.([\w-]+)|\[([\w-]+)(?:="([^"]*)")?\])$/) ??
      []
    if (tag) return (element: Element) => element.tagName === tag
    if (className) return (element: Element) => hasClass(element, className)
    if (name) {
      return (element: Element) =>
        value === undefined
          ? attribute(element, name) !== undefined
          : attribute(element, name) === value
    }
    throw new Error(
      `heading-anchors: "${selector}" in HEADING_EXCLUSION_SELECTOR is not a tag, a class or an attribute selector`,
    )
  })

const escapeAttribute = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")

const textContent = (node: Node): string =>
  "value" in node
    ? node.value
    : "childNodes" in node
      ? node.childNodes.map(textContent).join("")
      : ""

const hasDescendant = (
  node: Element,
  test: (element: Element) => boolean,
): boolean =>
  node.childNodes.some(
    (child) => isElement(child) && (test(child) || hasDescendant(child, test)),
  )

function headingId(heading: Element, parent: Element | undefined) {
  const id = attribute(heading, "id")
  if (id) return id
  return parent?.tagName === "section" &&
    parent.childNodes.find(isElement) === heading
    ? (attribute(parent, "id") ?? "")
    : ""
}

function headingEdits(heading: Element, id: string, text: string) {
  const location = heading.sourceCodeLocation
  if (!location?.startTag || !location.endTag) return []

  const close = location.endTag.startOffset
  const srOnly = hasClass(heading, "ui-sr-only")
  const edits = []

  if (
    heading.childNodes.length &&
    !hasDescendant(heading, (element) => element.tagName === "span")
  ) {
    if (heading.tagName === "h2" && !srOnly) {
      edits.push({
        at: location.startOffset + 1 + heading.tagName.length,
        text: ` data-heading="${escapeAttribute(text)}"`,
      })
    }
    edits.push(
      { at: location.startTag.endOffset, text: "<span>" },
      { at: close, text: "</span>" },
    )
  }

  if (
    id &&
    !srOnly &&
    !hasDescendant(heading, (element) => hasClass(element, "header-anchor"))
  ) {
    edits.push({
      at: close,
      text: `<a class="header-anchor" href="#${escapeAttribute(id)}" aria-label="Permalink to &quot;${escapeAttribute(text)}&quot;">&#8203;</a>`,
    })
  }

  return edits
}

export function addHeadingAnchors(html: string) {
  const edits: ReturnType<typeof headingEdits> = []
  const headings: { id: string; level: number; text: string }[] = []

  const visit = (node: Node, parent?: Element) => {
    if (isElement(node)) {
      if (excluded.some((matches) => matches(node))) return
      if (HEADINGS.has(node.tagName)) {
        const id = headingId(node, parent)
        const text = textContent(node).replace(/\s+/g, " ").trim()
        edits.push(...headingEdits(node, id, text))
        if (
          TOC_HEADINGS.has(node.tagName) &&
          (node.tagName === "h2" ? id : attribute(node, "id"))
        ) {
          headings.push({ id, level: Number(node.tagName[1]), text })
        }
        return
      }
    }
    if ("childNodes" in node) {
      for (const child of node.childNodes) {
        visit(child, isElement(node) ? node : undefined)
      }
    }
  }

  if (/<h[2-6]\b/i.test(html)) {
    visit(parseFragment(html, { sourceCodeLocationInfo: true }))
  }

  let last = 0
  let result = ""
  for (const { at, text } of edits.toSorted((a, b) => a.at - b.at)) {
    result += html.slice(last, at) + text
    last = at
  }
  return { headings, html: result + html.slice(last) }
}
