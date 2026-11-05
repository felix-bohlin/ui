/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Fieldset(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const tag = () => props.as || "fieldset"
  const Tag = dynamic(tag)

  return (
    <Tag
      class={["ui-fieldset", props.class]}
      role={tag() === "fieldset" ? undefined : "group"}
      {...rest}
    >
      {props.children}
    </Tag>
  )
}
