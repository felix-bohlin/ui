import { boxesOf, renderedText, splitTopLevel } from "./example-display.mjs"
import { attributeText, htmlText } from "./example-encoders.mjs"
import { BOOLEAN_ATTRIBUTES, parseHtml, VOID_ELEMENTS } from "./html-tokens.mjs"

export const BLANK_LINE_MARKER = "opui-blank-line"

export const WHITESPACE_MARK = "opui-ws:"

const isMark = (node) =>
  node.type === "comment" && node.value.startsWith(WHITESPACE_MARK)

const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml"

const ASTRO_SCRIPT = /[?&]astro&type=script\b/

const LEADING_NEWLINE = new Set(["listing", "pre", "textarea"])

const ITEMS = new Set(["flex", "grid", "items", "svg", "table"])

const WHITESPACE = /^[\t\n\f\r ]*$/

const run = (whitespace) => (whitespace.includes("\n") ? "\n" : " ")

const isHtml = (node) => node.namespace === HTML_NAMESPACE

export const mergeText = (nodes) =>
  nodes.reduce((merged, node) => {
    const previous = merged.at(-1)
    if (node.type === "text" && previous?.type === "text") {
      merged[merged.length - 1] = {
        ...previous,
        end: node.end,
        raw: previous.raw + node.raw,
        value: previous.value + node.value,
      }
    } else {
      merged.push(node)
    }
    return merged
  }, [])

const isAstroScript = (node) =>
  node?.type === "element" &&
  isHtml(node) &&
  node.tag === "script" &&
  ASTRO_SCRIPT.test(node.attrs.find(({ name }) => name === "src")?.value ?? "")

const withoutAstroParts = (nodes, file) =>
  mergeText(
    nodes.flatMap((node, index) => {
      if (isMark(node)) return []
      if (
        node.type === "text" &&
        WHITESPACE.test(node.value) &&
        isAstroScript(nodes[index + 1])
      ) {
        return []
      }
      if (node.type !== "element") return [node]
      if (isAstroScript(node)) return []
      if (isHtml(node) && /^(link|script|style)$/.test(node.tag)) {
        throw new Error(
          `${file}: the render has a <${node.tag}> that isn't Astro's`,
        )
      }
      return [
        {
          ...node,
          attrs: node.attrs.filter(
            ({ name }) => !name.startsWith("data-astro-") && name !== "slot",
          ),
          children: withoutAstroParts(node.children, file),
        },
      ]
    }),
  )

const attributeOf = ({ name, raw, value }) => {
  const written = /^[^\s=]+/.exec(raw)[0]
  if (raw.includes("=")) return `${written}="${attributeText(value)}"`
  return BOOLEAN_ATTRIBUTES.has(name) || /^(aria|data)-/.test(name)
    ? written
    : `${written}=""`
}

const textOf = (node, entry, { first, lone, nearElement }) => {
  if (entry.verbatim) {
    return (
      (first && node.value.startsWith("\n") ? "\n" : "") + htmlText(node.value)
    )
  }
  const dropped = lone ? "" : "\n"
  const [lead] = /^[\t\n\f\r ]*/.exec(node.value)
  const [trail] = /[\t\n\f\r ]*$/.exec(node.value)
  if (lead === node.value) {
    return entry.text === " " ? run(lead) : nearElement ? "\n" : ""
  }
  const middle = node.value
    .slice(lead.length, node.value.length - trail.length)
    .replace(/[\t\n\f\r ]+/g, run)
  return (
    (lead ? (entry.text.startsWith(" ") ? run(lead) : dropped) : "") +
    htmlText(middle) +
    (trail ? (entry.text.endsWith(" ") ? run(trail) : dropped) : "")
  )
}

/** @param {string} html @param {{ css?: string[], file?: string }} [options] */
export const cleanRender = (
  html,
  { css = [], file = "Example.astro" } = {},
) => {
  const nodes = withoutAstroParts(parseHtml(html), file)
  const boxes = boxesOf(nodes, css)
  const rendered = renderedText(nodes, { css })
  const childContext = (element, context) => {
    const box = boxes.get(element)
    if (box.outer === "contents") return context
    if (box.outer === "none")
      return ITEMS.has(box.shown.inner) ? "items" : "flow"
    return ITEMS.has(box.inner) ? "items" : "flow"
  }
  const isBlock = (node) =>
    node.type === "element" && boxes.get(node).outer === "block"
  const serialize = (children, context, parent, container = false) => {
    let out = ""
    let pending = false
    const verbatim = (node) =>
      node?.type === "text" && rendered.get(node).verbatim
    const breakHere = () => {
      if ((parent || out !== "") && !/\s$/.test(out)) out += "\n"
    }
    if (
      parent &&
      context === "flow" &&
      container &&
      children.length > 1 &&
      !verbatim(children[0]) &&
      !boxes.get(parent).before
    ) {
      breakHere()
    }
    children.forEach((node, index) => {
      if (node.type === "text") {
        const entry = rendered.get(node)
        let text = textOf(node, entry, {
          first: index === 0 && LEADING_NEWLINE.has(parent?.tag),
          lone: children.length === 1,
          nearElement: [children[index - 1], children[index + 1]].some(
            (sibling) => sibling?.type === "element",
          ),
        })
        if (pending && !entry.verbatim && !/^\s/.test(text)) text = `\n${text}`
        if (!entry.verbatim && out.endsWith("\n"))
          text = text.replace(/^\n+/, "")
        pending = false
        out += text
        return
      }
      if (node.type === "comment") {
        out += node.raw
        return
      }
      if (
        (context === "items" || isBlock(node) || pending) &&
        !verbatim(children[index - 1])
      ) {
        breakHere()
      }
      pending = context === "flow" && isBlock(node)
      const open = `<${[node.tag, ...node.attrs.map(attributeOf)].join(" ")}>`
      if (isHtml(node) && VOID_ELEMENTS.has(node.tag)) {
        out += open
      } else if (!isHtml(node) && node.close === "") {
        out += open.replace(/>$/, " />")
      } else {
        out += `${open}${serialize(
          node.children,
          childContext(node, context),
          node,
          context === "items" || boxes.get(node).outer !== "inline",
        )}</${node.tag}>`
      }
    })
    if (
      parent &&
      ((context === "items" &&
        children.some((child) => child.type === "element")) ||
        (context === "flow" && isBlock(children.at(-1) ?? {})) ||
        (context === "flow" &&
          container &&
          children.length > 1 &&
          children.at(-1)?.type === "element" &&
          !boxes.get(parent).after)) &&
      !verbatim(children.at(-1))
    ) {
      breakHere()
    }
    return out
  }
  let markup = ""
  let separator = ""
  for (const node of nodes) {
    if (node.type === "comment" && node.value === BLANK_LINE_MARKER) {
      separator = "\n\n"
      continue
    }
    if (node.type === "text" && WHITESPACE.test(node.value)) {
      separator ||= "\n"
      continue
    }
    const content =
      node.type === "text"
        ? textOf(node, rendered.get(node), { lone: true })
        : serialize([node], "items")
    markup += (markup ? separator || "\n" : "") + content
    separator = ""
  }
  return {
    markup,
    nodes: nodes.filter(
      (node) => !(node.type === "comment" && node.value === BLANK_LINE_MARKER),
    ),
  }
}

const outsideStrings = (text, change) =>
  text
    .split(/("[^"]*"|'[^']*')/)
    .map((part, index) => (index % 2 ? part : change(part)))
    .join("")

export const declarations = (style) =>
  splitTopLevel(style, ";")
    .map((declaration) =>
      outsideStrings(declaration.trim(), (part) =>
        part.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")"),
      ),
    )
    .filter(Boolean)
    .map((declaration) => declaration.replace(/\s*:\s*/, ": "))
    .join("; ")

/** @param {any[]} nodes @param {string[]} [css] */
export const meaningOf = (nodes, css = []) => {
  const rendered = renderedText(nodes, { css })
  const tokens = []
  const visit = (children) => {
    for (const node of children) {
      if (node.type === "comment") {
        tokens.push(`<!--${node.value}-->`)
      } else if (node.type === "text") {
        const { text } = rendered.get(node) ?? { text: "" }
        if (!text) continue
        if (typeof tokens.at(-1) === "object") tokens.at(-1).text += text
        else tokens.push({ text })
      } else if (!(isHtml(node) && /^(script|style)$/.test(node.tag))) {
        const attrs = node.attrs
          .map(
            ({ name, value }) =>
              `${name}=${JSON.stringify(name === "style" ? declarations(value) : value)}`,
          )
          .toSorted()
        tokens.push(`<${[node.tag, ...attrs].join(" ")}>`)
        visit(node.children)
        tokens.push(`</${node.tag}>`)
      }
    }
  }
  visit(nodes)
  return tokens.map((token) =>
    typeof token === "object" ? JSON.stringify(token.text) : token,
  )
}

export const meaningChange = (before, after) => {
  const index = before.findIndex((token, at) => token !== after[at])
  if (index === -1 && before.length === after.length) return undefined
  const at = index === -1 ? Math.min(before.length, after.length) : index
  return `${before[at] ?? "the end"} became ${after[at] ?? "the end"}, after ${before
    .slice(Math.max(0, at - 3), at)
    .join(" ")}`
}

/** @param {string} html @param {string[]} [css] */
export const whitespaceRoles = (html, css = []) => {
  const nodes = parseHtml(html)
  const rendered = renderedText(nodes, { css })
  const roles = new Map()
  const visit = (children) =>
    children.forEach((node, index) => {
      if (node.type === "element") visit(node.children)
      if (!isMark(node)) return
      const offset = Number(node.value.slice(WHITESPACE_MARK.length))
      const next = children[index + 1]
      const space =
        next?.type === "text" &&
        /^[\t\n\f\r ]/.test(next.value) &&
        !!rendered.get(next)?.text.startsWith(" ")
      roles.set(
        offset,
        roles.get(offset) === "space" || space ? "space" : "drop",
      )
    })
  visit(nodes)
  return roles
}
