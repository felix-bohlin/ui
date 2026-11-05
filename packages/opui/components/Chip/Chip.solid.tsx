/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit } from "solid-js"
import { tagAttrs } from "../tag"
import type { Props } from "./types.solid"

export default function Chip(props: Props) {
  const rest = omit(
    props,
    "as",
    "class",
    "disabled",
    "dot",
    "href",
    "multiline",
    "severity",
    "size",
    "variant",
    "end",
    "label",
    "start",
  )
  const variant = () => (props.variant === undefined ? "tonal" : props.variant)
  const tag = () => props.as || (props.href ? "a" : "div")
  const Tag = dynamic(tag)

  return (
    <Tag
      class={[
        "ui-chip",
        { "ui-dot": props.dot, "ui-multiline": props.multiline },
        props.severity && `ui-${props.severity}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        variant() !== "tonal" && `ui-${variant()}`,
        props.class,
      ]}
      {...tagAttrs(tag(), props.disabled, props.href)}
      {...(rest as object)}
    >
      {props.start}
      {props.label && <span class="ui-text">{props.label}</span>}
      {props.end}
    </Tag>
  )
}
