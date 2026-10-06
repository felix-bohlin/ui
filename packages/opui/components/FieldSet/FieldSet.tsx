import { omit } from "solid-js"
import { dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function FieldSet(props: Props) {
  const rest = omit(props, "as", "children", "class")

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
