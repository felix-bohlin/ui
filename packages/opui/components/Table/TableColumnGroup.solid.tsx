/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableColumnGroupProps as Props } from "./types.solid"

export default function TableColumnGroup(props: Props) {
  const rest = omit(props, "children")

  return <colgroup {...rest}>{props.children}</colgroup>
}
