import { merge, omit, Show } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Chip(rawProps: Props) {
  const props = merge({ variant: "tonal" }, rawProps)
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

  const Tag = () => props.as || (props.href ? "a" : "div")

  return (
    <Dynamic
      component={Tag()}
      class={[
        "ui-chip",
        { "ui-multiline": !!props.multiline },
        props.size && `ui-${props.size}`,
        props.variant && `ui-${props.variant}`,
        props.class,
      ]}
      href={Tag() === "a" ? props.href : undefined}
      {...rest}
    >
      {props.start}
      {props.children}
      <Show when={props.label}>
        <span class="ui-text">{props.label}</span>
      </Show>
      {props.end}
    </Dynamic>
  )
}
