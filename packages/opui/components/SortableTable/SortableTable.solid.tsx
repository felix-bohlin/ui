/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/sortable-table.js"
import type { Props } from "./types.solid"

export default function SortableTable(props: Props) {
  const rest = omit(
    props,
    "ascendingLabel",
    "class",
    "descendingLabel",
    "children",
  )

  return (
    <opui-sortable-table
      ascending-label={props.ascendingLabel}
      class={["ui-sortable-table", props.class]}
      descending-label={props.descendingLabel}
      {...rest}
    >
      {props.children}
    </opui-sortable-table>
  )
}
