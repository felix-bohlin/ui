/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function IconButton(props: Props) {
  const [local, rest] = splitProps(props, [
    "as",
    "color",
    "href",
    "size",
    "variant",
    "class",
    "children",
  ])

  const Tag = () => local.as || (local.href ? "a" : "button")

  return (
    <Dynamic
      component={Tag()}
      class={`ui-icon-button ${local.size ? `ui-${local.size}` : ""} ${local.variant ? `ui-${local.variant}` : ""} ${local.color ? `ui-${local.color}` : ""} ${local.class || ""}`.trim()}
      href={local.href}
      {...rest}
    >
      {local.children}
    </Dynamic>
  )
}
