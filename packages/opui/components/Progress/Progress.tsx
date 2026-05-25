/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import type { Props } from "./types.solid"

export default function Progress(props: Props) {
  const [local, rest] = splitProps(props, [
    "aria-busy",
    "aria-describedby",
    "aria-label",
    "id",
    "max",
    "value",
    "variant",
    "class",
    "children",
  ])

  return (
    <progress
      aria-busy={local["aria-busy"]}
      aria-describedby={local["aria-describedby"]}
      aria-label={local["aria-label"]}
      id={local.id}
      max={local.max}
      value={local.value}
      class={`ui-progress ${local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      {local.children}
    </progress>
  )
}
