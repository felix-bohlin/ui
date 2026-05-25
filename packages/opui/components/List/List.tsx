import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function List(props: Props) {
  const [local, rest] = splitProps(props, [
    "bordered",
    "dense",
    "gutterless",
    "variant",
    "class",
    "children",
  ])

  return (
    <ul
      class={`ui-list ${local.bordered ? "ui-bordered" : ""} ${local.dense ? "ui-dense" : ""} ${local.gutterless ? "ui-gutterless" : ""} ${local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      {local.children}
    </ul>
  )
}
