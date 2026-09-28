import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function FieldDescription(props: Props) {
  const rest = omit(props, "children", "class")

  return (
    <p class={["ui-field-description", props.class]} {...rest}>
      {props.children}
    </p>
  )
}
