/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Accordion(props: Props) {
  const rest = omit(props, "class", "markerAnimation", "variant", "children")

  return (
    <details
      class={[
        "ui-accordion",
        props.markerAnimation &&
          props.markerAnimation !== "rotate" &&
          `ui-marker-animation-${props.markerAnimation}`,
        props.variant && props.variant !== "plain" && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </details>
  )
}
