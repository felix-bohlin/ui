import { Comment, createTextVNode, Text, type VNode } from "vue"

const trimText = (node: VNode, pattern: RegExp) =>
  node.type === Text
    ? createTextVNode(String(node.children).replace(pattern, ""))
    : node

export const TrimmedSlot = ({ nodes = [] }: { nodes?: VNode[] }) => {
  const content = nodes.filter((node) => node.type !== Comment)
  return nodes.map((node) => {
    let trimmed = node
    if (node === content[0]) trimmed = trimText(trimmed, /^[\t\n\f\r ]+/)
    if (node === content.at(-1)) trimmed = trimText(trimmed, /[\t\n\f\r ]+$/)
    return trimmed
  })
}
