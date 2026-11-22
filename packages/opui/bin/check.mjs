import { parse } from "parse5"

const PARTS = ["start-text", "top", "start", "end", "bottom", "end-text"]

const ROOTS = ["ui-field", "ui-one-time-code"]

const CONTROLS = ["input", "select", "textarea"]

const BUTTONS = ["opui-password-toggle", "opui-step-button"]

const UNREAD = ["button", "output", "script", "style", "template"]

const children = (node) =>
  (node.childNodes ?? []).filter((child) => "tagName" in child)

const descendants = (node) =>
  children(node).flatMap((child) => [child, ...descendants(child)])

const attribute = (element, name) =>
  element?.attrs.find((attr) => attr.name === name)?.value

const hasClass = (element, name) =>
  (attribute(element, "class") ?? "").split(/\s+/).includes(name)

const readable = (node) => {
  if (node.nodeName === "#text") return node.value.trim() !== ""
  if (!("tagName" in node) || UNREAD.includes(node.tagName)) return false
  if (
    attribute(node, "aria-hidden") === "true" ||
    attribute(node, "hidden") !== undefined
  ) {
    return false
  }
  if (
    attribute(node, "aria-label")?.trim() ||
    (node.tagName === "img" && attribute(node, "alt")?.trim())
  ) {
    return true
  }
  return node.tagName !== "svg" && node.childNodes.some(readable)
}

const listed = (tokens) =>
  tokens.length > 0 ? `"${tokens.join(" ")}"` : "no part"

const fieldProblems = (root) => {
  const where = ROOTS.find((name) => hasClass(root, name))
  const field = children(root).find((child) =>
    hasClass(child, "ui-field-container"),
  )
  const control =
    field && children(field).find((child) => CONTROLS.includes(child.tagName))
  const id = attribute(control, "id")
  if (!field || !control || !id) {
    return [
      `.${where}: no <input>, <select> or <textarea> with an id directly in .ui-field-container`,
    ]
  }
  const problems = []
  const label = children(root).find((child) => child.tagName === "label")
  if (label && attribute(label, "for") !== id) {
    problems.push(
      `#${id}: the label's for is "${attribute(label, "for") ?? ""}", not "${id}"`,
    )
  }
  const shown = PARTS.flatMap((part) => {
    const element = [...children(root), ...children(field)].find((child) =>
      hasClass(child, `ui-${part}`),
    )
    if (!element || !readable(element)) return []
    const partId = attribute(element, "id")
    if (partId !== `${id}-${part}`) {
      problems.push(
        `#${id}: .ui-${part} has the id "${partId ?? ""}", not "${id}-${part}"`,
      )
    }
    return [`${id}-${part}`]
  })
  const described = (attribute(control, "aria-describedby") ?? "")
    .split(/\s+/)
    .filter((token) => token.startsWith(`${id}-`))
  if (described.join(" ") !== shown.join(" ")) {
    problems.push(
      `#${id}: aria-describedby lists ${listed(described)}, not ${listed(shown)}`,
    )
  }
  for (const element of descendants(root).filter((child) =>
    BUTTONS.includes(child.tagName),
  )) {
    for (const button of descendants(element).filter(
      (child) => attribute(child, "commandfor") !== undefined,
    )) {
      if (attribute(button, "commandfor") !== id) {
        problems.push(
          `#${id}: the <${element.tagName}> button's commandfor is "${attribute(button, "commandfor")}", not "${id}"`,
        )
      }
    }
  }
  return problems
}

export function checkHtml(html) {
  const roots = descendants(
    parse(html, { sourceCodeLocationInfo: true }),
  ).filter((element) => ROOTS.some((name) => hasClass(element, name)))
  return {
    fields: roots.length,
    problems: roots.flatMap((root) =>
      fieldProblems(root).map((message) => ({
        line: root.sourceCodeLocation?.startLine ?? 0,
        message,
      })),
    ),
  }
}
