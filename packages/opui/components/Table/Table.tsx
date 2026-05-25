/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function Table(props: Props) {
  const [local, rest] = splitProps(props, ["variant", "class", "children"])

  return (
    <table
      class={`ui-table ${local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      {local.children}
    </table>
  )
}
