import { omit } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function IconButton(props: Props) {
  const rest = omit(
    props,
    "as",
    "children",
    "class",
    "color",
    "href",
    "size",
    "variant",
  )

  const Tag = () => props.as || (props.href ? "a" : "button")

  return (
    <Dynamic
      component={Tag()}
      class={[
        "ui-icon-button",
        props.size && `ui-${props.size}`,
        props.variant && `ui-${props.variant}`,
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      href={props.href}
      {...rest}
    >
      {props.children}
    </Dynamic>
  )
}
