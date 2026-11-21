/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableBodyProps as Props } from "./types.solid"

export default function TableBody(props: Props) {
  const rest = omit(props, "children")

  return <tbody {...rest}>{props.children}</tbody>
}
