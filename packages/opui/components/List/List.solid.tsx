/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function List(props: Props) {
  const rest = omit(
    props,
    "as",
    "bordered",
    "class",
    "dense",
    "flush",
    "role",
    "variant",
    "children",
  )
  const tag = () => props.as || "ul"
  const Tag = dynamic(tag)
  const tagRole = () => props.role ?? "list"

  return (
    <Tag
      class={[
        "ui-list",
        {
          "ui-bordered": props.bordered,
          "ui-dense": props.dense,
          "ui-flush": props.flush,
        },
        props.variant && props.variant !== "filled" && `ui-${props.variant}`,
        props.class,
      ]}
      role={tagRole()}
      {...(rest as object)}
    >
      {props.children}
    </Tag>
  )
}
