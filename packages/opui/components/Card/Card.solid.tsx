/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Card(props: Props) {
  const rest = omit(props, "class", "density", "variant", "children")

  return (
    <div
      class={[
        "ui-card",
        props.density && props.density !== "normal" && `ui-${props.density}`,
        props.variant && props.variant !== "plain" && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </div>
  )
}
