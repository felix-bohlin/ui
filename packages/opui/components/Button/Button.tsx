import { omit } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Button(props: Props) {
  const rest = omit(
    props,
    "as",
    "children",
    "class",
    "color",
    "disabled",
    "href",
    "size",
    "variant",
  )

  const Tag = () => props.as || (props.href ? "a" : "button")
  const isButton = () => Tag() === "button"

  return (
    <Dynamic
      component={Tag()}
      class={[
        "ui-button",
        props.size && `ui-${props.size}`,
        props.variant && `ui-${props.variant}`,
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      disabled={isButton() ? props.disabled : undefined}
      href={props.href}
      {...rest}
    >
      {props.children}
    </Dynamic>
  )
}
