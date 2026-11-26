import { exampleIdBase } from "../src/utils/id.ts"
import { parseHtml } from "./html-tokens.mjs"

export const ID_PLACEHOLDER = "opui-example-id-"

const PLACEHOLDER = new RegExp(`${ID_PLACEHOLDER}(\\d+)(?!\\d)`, "g")

const ASCII_WHITESPACE = /[\t\n\f\r ]+/

export const createExampleIdPlaceholders = () => {
  let count = 0
  return () => `${ID_PLACEHOLDER}${++count}`
}

export const exampleKeyOf = (file) =>
  file.replace(/^.*src\/component-examples\//, "").replace(/\.astro$/, "")

export const assignExampleIds = (html, key) => {
  const base = exampleIdBase(key)
  const own = new RegExp(`^#?${base}-(\\d+)(?:-|$)`)
  const reserved = new Set()
  const order = []
  let inAttributes = 0
  const visit = (nodes) => {
    for (const node of nodes) {
      if (node.type !== "element") continue
      for (const { value } of node.attrs) {
        for (const token of value.split(ASCII_WHITESPACE)) {
          const match = own.exec(token)
          if (match) reserved.add(Number(match[1]))
        }
        for (const [, number] of value.matchAll(PLACEHOLDER)) {
          inAttributes++
          if (!order.includes(number)) order.push(number)
        }
      }
      visit(node.children)
    }
  }
  visit(parseHtml(html))
  if ([...html.matchAll(PLACEHOLDER)].length !== inAttributes) {
    throw new Error(
      `${key}: an id from Astro.locals.$id ended up outside an attribute`,
    )
  }
  const numbers = new Map()
  let next = 1
  for (const placeholder of order) {
    while (reserved.has(next)) next++
    numbers.set(placeholder, next++)
  }
  return html.replace(
    PLACEHOLDER,
    (_, number) => `${base}-${numbers.get(number)}`,
  )
}
