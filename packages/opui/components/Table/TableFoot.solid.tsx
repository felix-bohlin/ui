/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableFootProps as Props } from "./types.solid"

export default function TableFoot(props: Props) {
  const rest = omit(props, "children")

  return <tfoot {...rest}>{props.children}</tfoot>
}
