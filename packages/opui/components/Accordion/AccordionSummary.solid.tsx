/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { markerPath } from "./icons"
import type { AccordionSummaryProps as Props } from "./types.solid"

export default function AccordionSummary(props: Props) {
  const rest = omit(props, "class", "children", "marker")

  return (
    <summary class={[props.class]} {...rest}>
      {props.children}{" "}
      {props.marker === undefined ? (
        <svg
          aria-hidden="true"
          class="ui-marker"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={markerPath} />
        </svg>
      ) : (
        props.marker
      )}
    </summary>
  )
}
