/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function ButtonGroup(props: Props) {
  const [local, rest] = splitProps(props, [
    "color",
    "orientation",
    "size",
    "variant",
    "class",
    "children",
  ])

  return (
    <div
      class={`ui-button-group ${local.color ? `ui-${local.color}` : ""} ${local.size ? `ui-${local.size}` : ""} ${local.variant ? `ui-${local.variant}` : ""} ${local.orientation ? `ui-${local.orientation}` : ""} ${local.class || ""}`.trim()}
      role="group"
      {...rest}
    >
      {local.children}
    </div>
  )
}
