/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Card(props: Props) {
  const rest = omit(
    props,
    "class",
    "color",
    "density",
    "orientation",
    "variant",
    "children",
  )

  return (
    <div
      class={[
        "ui-card",
        props.color && `ui-${props.color}`,
        props.density && props.density !== "normal" && `ui-${props.density}`,
        props.orientation &&
          props.orientation !== "auto" &&
          `ui-${props.orientation}`,
        props.variant && props.variant !== "plain" && `ui-${props.variant}`,
        props.class,
      ]}
      {...rest}
    >
      {props.children}
    </div>
  )
}
