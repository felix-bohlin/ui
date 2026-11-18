/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/sortable-table.js"
import { defined } from "../attrs"
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
      {...defined(rest)}
    >
      {props.children} <span class="ui-sr-only" role="status" />
    </opui-sortable-table>
  )
}
