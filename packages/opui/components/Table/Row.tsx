import { omit } from "solid-js"
import type { RowProps } from "./types.solid"

export default function TableRow(props: RowProps) {
  const rest = omit(props, "children")

  return <tr {...rest}>{props.children}</tr>
}
