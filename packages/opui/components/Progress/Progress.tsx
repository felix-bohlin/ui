import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Progress(props: Props) {
  const rest = omit(props, "children", "class", "max", "value", "variant")

  return (
    <div
      class={[
        "ui-progress",
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
    >
      <progress max={props.max} value={props.value} {...rest}>
        {props.children}
      </progress>
    </div>
  )
}
