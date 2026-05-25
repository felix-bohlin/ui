import { splitProps, type JSX, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function Avatar(props: Props) {
  const [local, rest] = splitProps(props, [
    "alt",
    "as",
    "href",
    "isGroup",
    "src",
    "variant",
    "class",
    "children",
  ])

  const Tag = () => local.as || (local.href ? "a" : "div")

  return (
    <Dynamic
      component={Tag()}
      class={`${!local.isGroup ? "ui-avatar" : ""} ${!local.isGroup && local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`.trim()}
      href={local.href}
      role={local.isGroup ? "group" : undefined}
      {...rest}
    >
      <Show when={local.src} fallback={local.children}>
        <img src={local.src} alt={local.alt} />
      </Show>
    </Dynamic>
  )
}
