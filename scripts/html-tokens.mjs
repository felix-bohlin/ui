import {
  foreignContent,
  html,
  parseFragment,
  Tokenizer,
  TokenizerMode,
} from "parse5"

export const VOID_ELEMENTS = new Set([
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

export const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "popover",
  "readonly",
  "required",
  "reversed",
  "selected",
])

const TEXT_MODES = new Map([
  ["iframe", TokenizerMode.RAWTEXT],
  ["noembed", TokenizerMode.RAWTEXT],
  ["noframes", TokenizerMode.RAWTEXT],
  ["noscript", TokenizerMode.RAWTEXT],
  ["plaintext", TokenizerMode.PLAINTEXT],
  ["script", TokenizerMode.SCRIPT_DATA],
  ["style", TokenizerMode.RAWTEXT],
  ["textarea", TokenizerMode.RCDATA],
  ["title", TokenizerMode.RCDATA],
  ["xmp", TokenizerMode.RAWTEXT],
])

const TOLERATED_ERRORS = new Set(["incorrectly-opened-comment"])

const LEADING_NEWLINE = new Set(["listing", "pre", "textarea"])

const SVG_HTML_POINTS = new Set(["desc", "foreignObject", "title"])

const namespaceOf = (tag, parent) => {
  const inHtml =
    !parent ||
    parent.namespace === html.NS.HTML ||
    (parent.namespace === html.NS.SVG && SVG_HTML_POINTS.has(parent.tag))
  if (!inHtml) return parent.namespace
  if (tag === "svg") return html.NS.SVG
  if (tag === "math") return html.NS.MATHML
  return html.NS.HTML
}

const isForeign = (element) =>
  !!element &&
  element.namespace !== html.NS.HTML &&
  !(element.namespace === html.NS.SVG && SVG_HTML_POINTS.has(element.tag))

const fail = (source, offset, message) => {
  const line = source.slice(0, offset).split("\n").length
  return new Error(`${message} (line ${line})`)
}

const attributesOf = (token, namespace, source) => {
  const raw = new Map(
    Object.entries(token.location.attrs ?? {}).map(
      ([name, { endOffset, startOffset }]) => [
        name,
        source.slice(startOffset, endOffset),
      ],
    ),
  )
  const names = token.attrs.map(({ name }) => name)
  if (namespace === html.NS.SVG) foreignContent.adjustTokenSVGAttrs(token)
  if (namespace === html.NS.MATHML) foreignContent.adjustTokenMathMLAttrs(token)
  return token.attrs.map(({ name, value }, index) => ({
    name,
    raw: raw.get(names[index]),
    value,
  }))
}

const parseTree = (source) => {
  const root = { children: [], namespace: html.NS.HTML, tag: "" }
  const stack = [root]
  const top = () => stack.at(-1)
  let offset = 0
  let chars = ""
  let duplicates = []
  const flush = (end) => {
    if (offset < end) {
      const parent = top()
      const first =
        parent.children.length === 0 &&
        parent.namespace === html.NS.HTML &&
        LEADING_NEWLINE.has(parent.tag)
      parent.children.push({
        end,
        raw: source.slice(offset, end),
        start: offset,
        type: "text",
        value: first ? chars.replace(/^\n/, "") : chars,
      })
    }
    chars = ""
  }
  const onText = (token) => {
    chars += token.chars
  }
  const tokenizer = new Tokenizer(
    { sourceCodeLocationInfo: true },
    {
      onCharacter: onText,
      onComment: ({ data, location }) => {
        flush(location.startOffset)
        top().children.push({
          end: location.endOffset,
          raw: source.slice(location.startOffset, location.endOffset),
          start: location.startOffset,
          type: "comment",
          value: data,
        })
        offset = location.endOffset
      },
      onDoctype: ({ location }) => {
        throw fail(source, location.startOffset, "a <!DOCTYPE>")
      },
      onEndTag: (token) => {
        const { location } = token
        flush(location.startOffset)
        offset = location.endOffset
        const element = top()
        if (element === root) {
          throw fail(
            source,
            location.startOffset,
            `a stray </${token.tagName}>`,
          )
        }
        if (element.tag.toLowerCase() !== token.tagName) {
          throw fail(
            source,
            location.startOffset,
            `</${token.tagName}> closes <${element.tag}>`,
          )
        }
        element.close = source.slice(location.startOffset, location.endOffset)
        element.end = location.endOffset
        stack.pop()
        tokenizer.inForeignNode = isForeign(top())
      },
      onEof: () => flush(source.length),
      onNullCharacter: onText,
      onParseError: (error) => {
        if (TOLERATED_ERRORS.has(error.code)) return
        if (error.code === "duplicate-attribute") {
          duplicates.push(tokenizer.currentAttr)
          return
        }
        throw fail(source, error.startOffset, `the parse error ${error.code}`)
      },
      onStartTag: (token) => {
        const { location } = token
        flush(location.startOffset)
        offset = location.endOffset
        for (const duplicate of duplicates) {
          const kept = token.attrs.find(({ name }) => name === duplicate.name)
          if (kept.value !== duplicate.value) {
            throw fail(
              source,
              location.startOffset,
              `the attribute ${duplicate.name} twice with different values on <${token.tagName}>`,
            )
          }
        }
        duplicates = []
        const parent = top()
        const namespace = namespaceOf(token.tagName, parent)
        const name = token.tagName
        if (namespace === html.NS.SVG) {
          foreignContent.adjustTokenSVGTagName(token)
        }
        const element = {
          attrs: attributesOf(token, namespace, source),
          children: [],
          close: "",
          end: location.endOffset,
          namespace,
          open: source.slice(location.startOffset, location.endOffset),
          start: location.startOffset,
          tag: token.tagName,
          type: "element",
        }
        parent.children.push(element)
        const isHtml = namespace === html.NS.HTML
        if (isHtml && VOID_ELEMENTS.has(name)) return
        if (token.selfClosing) {
          if (isHtml) {
            throw fail(
              source,
              location.startOffset,
              `a self-closing <${name}/>`,
            )
          }
          return
        }
        stack.push(element)
        if (isHtml && TEXT_MODES.has(name)) {
          tokenizer.state = TEXT_MODES.get(name)
        }
        tokenizer.inForeignNode = isForeign(element)
      },
      onWhitespaceCharacter: onText,
    },
  )
  tokenizer.write(source, true)
  if (stack.length > 1) {
    throw fail(source, top().start, `an unclosed <${top().tag}>`)
  }
  return root.children
}

const p5Children = (node) =>
  node.nodeName === "template" ? node.content.childNodes : node.childNodes

const describe = (node) =>
  node.type === "element"
    ? `<${node.tag}>`
    : node.type === "text"
      ? JSON.stringify(node.value.slice(0, 40))
      : "a comment"

const browserView = (nodes) =>
  nodes.map((node) =>
    node.type === "element"
      ? {
          attrs: node.attrs.map(({ name, value }) => `${name}=${value}`),
          children: node.tag === "select" ? [] : browserView(node.children),
          tag: node.tag,
          type: "element",
        }
      : { type: node.type, value: node.value },
  )

const parse5View = (nodes) =>
  nodes.map((node) =>
    "tagName" in node
      ? {
          attrs: node.attrs.map(
            ({ name, prefix, value }) =>
              `${prefix ? `${prefix}:` : ""}${name}=${value}`,
          ),
          children:
            node.tagName === "select" ? [] : parse5View(p5Children(node)),
          tag: node.tagName,
          type: "element",
        }
      : node.nodeName === "#comment"
        ? { type: "comment", value: node.data }
        : { type: "text", value: node.value },
  )

const firstDifference = (ours, theirs, nodes, path = []) => {
  for (let index = 0; index < Math.max(ours.length, theirs.length); index++) {
    const [a, b] = [ours[index], theirs[index]]
    const at = [...path, a ? describe(nodes[index]) : "the end"]
    if (
      !a ||
      !b ||
      a.type !== b.type ||
      a.tag !== b.tag ||
      a.value !== b.value ||
      a.attrs?.join("\n") !== b.attrs?.join("\n")
    ) {
      return { at, node: nodes[index] }
    }
    if (a.type === "element") {
      const inner = firstDifference(
        a.children,
        b.children,
        nodes[index].children,
        at,
      )
      if (inner) return inner
    }
  }
}

export const parseHtml = (source) => {
  const nodes = parseTree(source)
  const difference = firstDifference(
    browserView(nodes),
    parse5View(parseFragment(source).childNodes),
    nodes,
  )
  if (difference) {
    throw fail(
      source,
      difference.node?.start ?? source.length,
      `the HTML parser builds a different tree at ${difference.at.join(" > ")}`,
    )
  }
  return nodes
}

export const serialize = (nodes) =>
  nodes
    .map((node) =>
      node.type === "element"
        ? node.open + serialize(node.children) + node.close
        : node.raw,
    )
    .join("")
