/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TableHeaderCellProps as Props } from "./types.solid"

export default function TableHeaderCell(props: Props) {
  const rest = omit(props, "class", "numeric", "sortable", "children")

  return (
    <th
      class={[{ "ui-numeric": props.numeric }, props.class]}
      data-sort={props.sortable ? "" : undefined}
      {...rest}
    >
      {props.sortable ? (
        <button type="button">{props.children}</button>
      ) : (
        props.children
      )}
    </th>
  )
}
