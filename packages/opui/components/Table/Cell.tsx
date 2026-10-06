import { omit } from "solid-js"
import type { CellProps } from "./types.solid"

export default function TableCell(props: CellProps) {
  const rest = omit(props, "children")

  return <td {...rest}>{props.children}</td>
}
