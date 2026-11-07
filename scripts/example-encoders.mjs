import { parseFragment } from "parse5"
import ts from "typescript"

const NBSP = " "

export const decodeText = (source) =>
  parseFragment(source)
    .childNodes.map((node) => node.value ?? "")
    .join("")

export const decodeTextarea = (source) =>
  parseFragment(`<textarea>${source}</textarea>`)
    .childNodes[0].childNodes.map((node) => node.value)
    .join("")

export const decodeAttribute = (raw, quote = '"') =>
  parseFragment(`<a b=${quote}${raw}${quote}>`).childNodes[0].attrs[0].value

export const htmlText = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replaceAll(NBSP, "&nbsp;")

export const markupText = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;")

const ambiguousAmpersand = (tail, quote) => {
  const [head] = /^&#?[A-Za-z0-9]*;?/.exec(tail)
  const probe = head + (tail[head.length] ?? "")
  if (/^&#?[A-Za-z0-9]+;/.test(head)) return true
  const escaped = probe.replaceAll(quote, quote === '"' ? "&quot;" : "&#39;")
  return decodeAttribute(escaped, quote) !== probe
}

export const attributeText = (value, quote = '"') => {
  let encoded = ""
  for (let index = 0; index < value.length; index++) {
    const character = value[index]
    if (character === quote) {
      encoded += quote === '"' ? "&quot;" : "&#39;"
    } else if (character === "&") {
      encoded += ambiguousAmpersand(value.slice(index), quote) ? "&amp;" : "&"
    } else {
      encoded += character === NBSP ? "&nbsp;" : character
    }
  }
  return encoded
}

const jsxDecoded = (source) => {
  const { outputText } = ts.transpileModule(`<p>${source}</p>`, {
    compilerOptions: { jsx: ts.JsxEmit.React, jsxFactory: "h" },
    fileName: "text.tsx",
  })
  return new Function(
    "h",
    `return ${outputText.replace(/^"use strict";\s*/, "")}`,
  )((_, __, ...children) => children.join(""))
}

const stableReferences = new Map()

const jsxReferenceIsStable = (reference) => {
  if (!stableReferences.has(reference)) {
    stableReferences.set(
      reference,
      jsxDecoded(reference) === decodeText(reference),
    )
  }
  return stableReferences.get(reference)
}

const jsxEscaped = (decoded) =>
  decoded
    .replace(/&(?=#?[A-Za-z0-9]+;)/g, "&amp;")
    .replace(/[{}<>]/g, (character) => `{${JSON.stringify(character)}}`)
    .replaceAll(NBSP, "&nbsp;")

export const jsxText = (source) =>
  source
    .split(/(&#?[A-Za-z0-9]+;)/)
    .map((part, index) =>
      index % 2 === 1 && jsxReferenceIsStable(part)
        ? part
        : jsxEscaped(decodeText(part)),
    )
    .join("")

const jsxAttributes = new Map()

const jsxAttributeIsStable = (value, quote) => {
  const key = quote + value
  if (!jsxAttributes.has(key)) {
    const { outputText } = ts.transpileModule(
      `<p a=${quote}${value}${quote} />`,
      {
        compilerOptions: { jsx: ts.JsxEmit.React, jsxFactory: "h" },
        fileName: "attribute.tsx",
      },
    )
    const props = new Function(
      "h",
      `return ${outputText.replace(/^"use strict";\s*/, "")}`,
    )((_, properties) => properties)
    jsxAttributes.set(key, props.a === value)
  }
  return jsxAttributes.get(key)
}

export const jsxAttribute = (name, value) => {
  const literal = (quote) => `${name}=${quote}${value}${quote}`
  if (value.includes('"') && value.includes("'")) {
    return `${name}={${JSON.stringify(value)}}`
  }
  const quote = value.includes('"') ? "'" : '"'
  return !value.includes("&") || jsxAttributeIsStable(value, quote)
    ? literal(quote)
    : `${name}={${JSON.stringify(value)}}`
}

export const templateLiteral = (value) =>
  value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${")
