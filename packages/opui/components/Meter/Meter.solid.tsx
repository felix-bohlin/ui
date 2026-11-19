/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Meter(props: Props) {
  const rest = omit(props, "class", "variant", "children")

  return (
    <meter
      class={[
        "ui-meter",
        props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </meter>
  )
}
