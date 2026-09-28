import { omit } from "solid-js"
import type { HeaderCellProps } from "./types.solid"

export default function TableHeaderCell(props: HeaderCellProps) {
  const rest = omit(props, "children")

  return <th {...rest}>{props.children}</th>
}
