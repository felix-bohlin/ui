/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import { tagAttrs } from "../tag"
import type { Props } from "./types.solid"

export default function Button(props: Props) {
  const rest = omit(
    props,
    "as",
    "class",
    "color",
    "disabled",
    "href",
    "round",
    "size",
    "variant",
    "children",
  )
  const tag = () => props.as || (props.href ? "a" : "button")
  const Tag = dynamic(tag)

  return (
    <Tag
      class={[
        "ui-button",
        { "ui-round": props.round },
        props.color && `ui-${props.color}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.variant &&
          props.variant !== "transparent" &&
          `ui-${props.variant}`,
        props.class,
      ]}
      {...tagAttrs(tag(), props.disabled, props.href)}
      {...rest}
    >
      {props.children}
    </Tag>
  )
}
