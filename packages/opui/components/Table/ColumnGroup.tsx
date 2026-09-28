import { omit } from "solid-js"
import type { ColumnGroupProps } from "./types.solid"

export default function TableColumnGroup(props: ColumnGroupProps) {
  const rest = omit(props, "children")

  return <colgroup {...rest}>{props.children}</colgroup>
}
