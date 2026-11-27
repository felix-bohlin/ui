import { VOID_ELEMENTS } from "./html-tokens.mjs"

export const attributeNode = (item, refuse) => {
  if (item.name.includes(":")) throw refuse(`the directive ${item.name}`)
  if (item.kind === "quoted") {
    return { kind: "static", name: item.name, value: item.value }
  }
  if (item.kind === "empty") return { kind: "boolean", name: item.name }
  if (item.kind === "expression") {
    return { code: item.value.trim(), kind: "expression", name: item.name }
  }
  if (item.kind === "template-literal") {
    return { code: `\`${item.value}\``, kind: "expression", name: item.name }
  }
  throw refuse(`the attribute ${item.name}`)
}

const EMPTY_ELEMENTS = {
  components: (node) => !!(node.component || node.variable),
  every: () => true,
  foreign: (node) => !!(node.component || node.variable || node.foreign),
}

export const selfCloses = (node, content, emptyElements) =>
  VOID_ELEMENTS.has(node.tag) ||
  (!content.trim() && EMPTY_ELEMENTS[emptyElements](node))

export const runLayout = ({ run }) =>
  run === "\n\n" ? "\n\n" : run.includes("\n") ? "\n" : " "

export const atEdge = (parts, position, { leading, trailing }) =>
  (leading && position === 0) || (trailing && position === parts.length - 1)
