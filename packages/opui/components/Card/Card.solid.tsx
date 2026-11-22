/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Card(props: Props) {
  const rest = omit(
    props,
    "as",
    "class",
    "color",
    "density",
    "orientation",
    "variant",
    "children",
  )
  const tag = () => props.as || "div"
  const Tag = dynamic(tag)

  return (
    <Tag
      class={[
        "ui-card",
        props.color && `ui-${props.color}`,
        props.density && props.density !== "normal" && `ui-${props.density}`,
        props.orientation &&
          props.orientation !== "auto" &&
          `ui-${props.orientation}`,
        props.variant && props.variant !== "plain" && `ui-${props.variant}`,
        props.class,
      ]}
      {...(rest as object)}
    >
      {props.children}
    </Tag>
  )
}
