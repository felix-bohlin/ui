/* @jsxImportSource solid-js */
import { splitProps, type JSX } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function Button(props: Props) {
  const [local, rest] = splitProps(props, [
    "as",
    "color",
    "disabled",
    "href",
    "size",
    "variant",
    "class",
    "children",
  ])

  const Tag = () => local.as || (local.href ? "a" : "button")
  const isButton = () => Tag() === "button"

  return (
    <Dynamic
      component={Tag()}
      class={`ui-button ${isButton() && local.disabled ? "ui-disabled" : ""} ${local.size ? `ui-${local.size}` : ""} ${local.variant ? `ui-${local.variant}` : ""} ${local.color ? `ui-${local.color}` : ""} ${local.class || ""}`.trim()}
      disabled={isButton() ? local.disabled : undefined}
      href={local.href}
      {...rest}
    >
      {local.children}
    </Dynamic>
  )
}
