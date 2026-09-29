import { merge, omit } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Form(rawProps: Props) {
  const props = merge({ as: "form" }, rawProps)
  const rest = omit(props, "as", "children", "class")

  return (
    <Dynamic component={props.as} class={["ui-form", props.class]} {...rest}>
      {props.children}
    </Dynamic>
  )
}
