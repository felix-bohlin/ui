/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableRowProps as Props } from "./types.solid"

export default function TableRow(props: Props) {
  const rest = omit(props, "children")

  return <tr {...rest}>{props.children}</tr>
}
