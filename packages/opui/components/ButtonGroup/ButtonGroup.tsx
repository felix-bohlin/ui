import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function ButtonGroup(props: Props) {
  const rest = omit(
    props,
    "children",
    "class",
    "color",
    "orientation",
    "size",
    "variant",
  )

  return (
    <div
      class={[
        "ui-button-group",
        props.color && `ui-${props.color}`,
        props.size && `ui-${props.size}`,
        props.variant && `ui-${props.variant}`,
        props.orientation && `ui-${props.orientation}`,
        props.class,
      ]}
      role="group"
      {...rest}
    >
      {props.children}
    </div>
  )
}
