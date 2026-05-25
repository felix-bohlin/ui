import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import type { Props } from "./types.solid"

export default function Drawer(props: Props) {
  const [local, rest] = splitProps(props, [
    "backdrop",
    "closedby",
    "id",
    "scrollLock",
    "side",
    "header",
    "content",
    "footer",
    "class",
    "children",
  ])

  const drawerId = () => local.id || createUniqueId()

  return (
    <dialog
      id={drawerId()}
      /* @ts-ignore: closedby might not be typed in all environments */
      closedby={local.closedby !== undefined ? local.closedby : "any"}
      class={`ui-drawer ${local.side || "inline-start" ? `ui-${local.side || "inline-start"}` : ""} ${local.backdrop === "transparent" ? "ui-backdrop-transparent" : ""} ${local.scrollLock ?? true ? "ui-scroll-lock" : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      <Show when={local.header}>
        {local.header}
      </Show>

      <div class="ui-content">
        {local.content || local.children}
      </div>

      <Show when={local.footer}>
        {local.footer}
      </Show>
    </dialog>
  )
}
