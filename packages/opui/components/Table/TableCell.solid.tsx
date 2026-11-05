/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableCellProps as Props } from "./types.solid"

export default function TableCell(props: Props) {
  const rest = omit(props, "class", "numeric", "children")

  return (
    <td class={[{ "ui-numeric": props.numeric }, props.class]} {...rest}>
      {props.children}
    </td>
  )
}
