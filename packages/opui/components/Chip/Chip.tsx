/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function Chip(props: Props) {
  const [local, rest] = splitProps(props, [
    "as",
    "label",
    "multiline",
    "size",
    "variant",
    "href",
    "start",
    "end",
    "class",
    "children",
  ])

  const Tag = () => local.as || (local.href ? "a" : "div")

  return (
    <Dynamic
      component={Tag()}
      class={`ui-chip ${local.multiline ? "ui-multiline" : ""} ${local.size ? `ui-${local.size}` : ""} ${local.variant || "tonal" ? `ui-${local.variant || "tonal"}` : ""} ${local.class || ""}`.trim()}
      href={local.href}
      {...rest}
    >
      {local.start}
      {local.children}
      <Show when={local.label}>
        <span class="ui-text">{local.label}</span>
      </Show>
      {local.end}
    </Dynamic>
  )
}
