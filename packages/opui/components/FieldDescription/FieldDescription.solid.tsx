/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function FieldDescription(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <p class={["ui-description", props.class]} {...rest}>
      {props.children}
    </p>
  )
}
