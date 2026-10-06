import { omit, Show } from "solid-js"
import { dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Chip(props: Props) {
  const rest = omit(
    props,
    "as",
    "children",
    "class",
    "end",
    "href",
    "label",
    "multiline",
    "size",
    "start",
    "variant",
  )

  const tag = () => props.as || (props.href ? "a" : "div")
  const variant = () => props.variant ?? "tonal"
  const Tag = dynamic(tag)

  return (
    <Tag
      class={[
        "ui-chip",
        {
          "ui-multiline": props.multiline,
        },
        props.size && `ui-${props.size}`,
        variant() && `ui-${variant()}`,
        props.class,
      ]}
      href={tag() === "a" ? props.href : undefined}
      type={tag() === "button" ? "button" : undefined}
      {...rest}
    >
      {props.start}
      {props.children}
      <Show when={props.label}>
        <span class="ui-text">{props.label}</span>
      </Show>
      {props.end}
    </Tag>
  )
}
