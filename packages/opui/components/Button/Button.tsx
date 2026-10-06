import { omit } from "solid-js"
import { dynamic } from "@solidjs/web"
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
    "iconOnly",
    "label",
    "ripple",
    "rounded",
    "size",
    "variant",
  )

  const tag = () => props.as || (props.href ? "a" : "button")
  const isButton = () => tag() === "button"
  const Tag = dynamic(tag)

  return (
    <Tag
      class={[
        "ui-button",
        {
          "ui-ripple": props.ripple,
          "ui-rounded": props.rounded,
        },
        props.size && `ui-${props.size}`,
        props.variant && `ui-${props.variant}`,
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      aria-disabled={!isButton() && props.disabled ? "true" : undefined}
      aria-label={props.label}
      disabled={isButton() ? props.disabled : undefined}
      href={props.href}
      type={isButton() ? "button" : undefined}
      {...rest}
    >
      {props.children}
    </Tag>
  )
}
