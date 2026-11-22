/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/sortable-table.js"
import { defined } from "../attrs"
import { hydrated, hydrating } from "../solid"
import type { Props } from "./types.solid"

export default function SortableTable(props: Props) {
  const rest = omit(
    props,
    "ascendingLabel",
    "class",
    "descendingLabel",
    "ref",
    "children",
  )

  return (
    <opui-sortable-table
      ascending-label={props.ascendingLabel}
      class={["ui-sortable-table", props.class]}
      descending-label={props.descendingLabel}
      {...hydrating()}
      ref={[props.ref, hydrated]}
      {...defined(rest)}
    >
      {props.children} <span class="ui-sr-only" role="status" />
    </opui-sortable-table>
  )
}
