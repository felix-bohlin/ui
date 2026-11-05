/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Form(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const tag = () => props.as || "form"
  const Tag = dynamic(tag)

  return (
    <Tag class={["ui-form", props.class]} {...rest}>
      {props.children}
    </Tag>
  )
}
