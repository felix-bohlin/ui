import { parse } from "@astrojs/compiler"
import { renderedText } from "./example-display.mjs"
import { parseHtml } from "./html-tokens.mjs"

export const BLANK_LINE_MARKER = "opui-blank-line"

export const BLANK_LINE = /\n[^\S\n]*\n/

export const RAW_TEXT = new Set([
  "listing",
  "pre",
  "script",
  "style",
  "textarea",
  "title",
  "xmp",
])

const WHITESPACE_MARK = "opui-ws:"

const RUN = /[\t\n\f\r ]+/g

export const isWhitespaceMark = (node) =>
  node.type === "comment" && node.value.startsWith(WHITESPACE_MARK)

const runsOf = (value, start) =>
  [...value.matchAll(RUN)].map((match) => ({
    index: match.index,
    offset:
      start === undefined
        ? undefined
        : start + Buffer.byteLength(value.slice(0, match.index)),
    run: match[0],
  }))

const layoutRole = (run) => (run.includes("\n") ? "drop" : "space")

const markTopLevelBlankLines = async (source) => {
  const { ast } = await parse(source, { position: true })
  const nodes = ast.children.filter((node) => node.type !== "frontmatter")
  const isBody = (node) =>
    node &&
    node.type !== "text" &&
    !(node.type === "element" && /^(script|style)$/.test(node.name))
  const neighbor = (index, step) => {
    let at = index + step
    while (nodes[at]?.type === "text") at += step
    return nodes[at]
  }
  let bytes = Buffer.from(source)
  for (const [index, node] of [...nodes.entries()].toReversed()) {
    if (
      node.type === "text" &&
      BLANK_LINE.test(node.value) &&
      isBody(neighbor(index, -1)) &&
      isBody(neighbor(index, 1))
    ) {
      const { end, start } = node.position
      bytes = Buffer.concat([
        bytes.subarray(0, start.offset),
        Buffer.from(
          node.value.replace(
            /[^\S\n]*\n[^\S\n]*\n\s*/g,
            `\n<!--${BLANK_LINE_MARKER}-->\n`,
          ),
        ),
        bytes.subarray(end.offset),
      ])
    }
  }
  return bytes.toString()
}

const renderedRoles = (html, css) => {
  const nodes = parseHtml(html)
  const rendered = renderedText(nodes, { css })
  const roles = new Map()
  const visit = (children) =>
    children.forEach((node, index) => {
      if (node.type === "element") visit(node.children)
      if (!isWhitespaceMark(node)) return
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

/** @param {string} source */
export const markWhitespace = async (source) => {
  const { ast } = await parse(source, { position: true })
  const marked = new Set()
  const raw = new Set()
  const visit = (nodes, parent, inRaw) => {
    for (const node of nodes) {
      if (node.type === "text") {
        if (parent === "root" || parent === "expression") continue
        const runs = inRaw ? raw : marked
        for (const { offset } of runsOf(
          node.value,
          node.position.start.offset,
        )) {
          runs.add(offset)
        }
        continue
      }
      if (!node.children) continue
      const setsContent = node.attributes?.some((item) =>
        ["set:html", "set:text"].includes(item.name),
      )
      visit(
        node.children,
        node.type,
        inRaw ||
          setsContent ||
          (node.type === "element" && RAW_TEXT.has(node.name)),
      )
    }
  }
  visit(ast.children, "root", false)
  let bytes = Buffer.from(source)
  for (const offset of [...marked].toReversed()) {
    bytes = Buffer.concat([
      bytes.subarray(0, offset),
      Buffer.from(`<Fragment set:html="<!--${WHITESPACE_MARK}${offset}-->" />`),
      bytes.subarray(offset),
    ])
  }
  return {
    /** @param {string} rendered @param {string[]} [css] */
    read: (rendered, css = []) => {
      const roles = renderedRoles(rendered, css)
      const roleOf = (offset, run) => {
        if (offset === undefined || raw.has(offset)) return layoutRole(run)
        if (!marked.has(offset)) {
          throw new Error(
            `the whitespace at byte ${offset} of the source has no mark and isn't raw text, so the generator read a text that scripts/example-whitespace.mjs never saw`,
          )
        }
        return roles.get(offset) ?? layoutRole(run)
      }
      /** @param {{ start?: number, topLevel?: boolean, value: string }} text */
      return ({ start, topLevel, value }) => {
        const parts = []
        let last = 0
        for (const { index, offset, run } of runsOf(value, start)) {
          if (index > last) parts.push({ text: value.slice(last, index) })
          parts.push(
            topLevel
              ? { role: "drop", run: BLANK_LINE.test(run) ? "\n\n" : run }
              : { role: roleOf(offset, run), run },
          )
          last = index + run.length
        }
        if (last < value.length) parts.push({ text: value.slice(last) })
        return parts
      }
    },
    source: await markTopLevelBlankLines(bytes.toString()),
  }
}
