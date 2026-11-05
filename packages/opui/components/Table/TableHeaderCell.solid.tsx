/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import { cx } from "../cx"
import type { TableHeaderCellProps as Props } from "./types.solid"

export default function TableHeaderCell(props: Props) {
  const rest = omit(props, "class", "numeric", "sortable", "children")
  const resolvedChildren = children(() => props.children)

  return (
    <th
      class={cx([{ "ui-numeric": props.numeric }, props.class])}
      data-sort={props.sortable ? "" : undefined}
      {...rest}
    >
      {props.sortable ? (
        <button type="button">{resolvedChildren()}</button>
      ) : (
        resolvedChildren()
      )}
    </th>
  )
}
