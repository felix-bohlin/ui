/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function ButtonGroup(props: Props) {
  const rest = omit(
    props,
    "class",
    "color",
    "orientation",
    "overflow",
    "size",
    "variant",
    "children",
  )

  return (
    <div
      class={[
        "ui-button-group",
        { "ui-vertical": props.orientation === "vertical" },
        props.color && `ui-${props.color}`,
        props.overflow &&
          props.overflow !== "wrap" &&
          `ui-overflow-${props.overflow}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.variant &&
          props.variant !== "transparent" &&
          `ui-${props.variant}`,
        props.class,
      ]}
      role="group"
      {...rest}
    >
      {props.children}
    </div>
  )
}
