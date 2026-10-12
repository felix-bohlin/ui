import { Fragment, provide, useId, type VNode } from "vue"
import FieldEndText from "./FieldEndText.vue"
import { FieldRootKey, type FieldRoot } from "./types.d.vue"

const hasPart = (nodes: VNode[], part: unknown): boolean =>
  nodes.some(
    (node) =>
      node.type === part ||
      (node.type === Fragment &&
        Array.isArray(node.children) &&
        hasPart(node.children as VNode[], part)),
  )

export const provideFieldRoot = (
  render: () => VNode[] | undefined,
  invalid: () => boolean | undefined,
) => {
  const field: FieldRoot = {
    describedBy: undefined,
    endTextId: `end-text-${useId()}`,
    get invalid() {
      return invalid()
    },
  }
  provide(FieldRootKey, field)

  return () => {
    const nodes = render() ?? []
    field.describedBy = hasPart(nodes, FieldEndText)
      ? field.endTextId
      : undefined
    return nodes
  }
}
