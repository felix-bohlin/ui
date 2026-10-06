import { omit } from "solid-js"
import { dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Form(props: Props) {
  const rest = omit(props, "as", "children", "class")

  const Tag = dynamic(() => props.as || "form")

  return (
    <Tag class={["ui-form", props.class]} {...rest}>
      {props.children}
    </Tag>
  )
}
