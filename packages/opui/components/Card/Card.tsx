import { splitProps, type JSX, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Card(props: Props) {
  const [local, rest] = splitProps(props, [
    "actionsAlign",
    "variant",
    "header",
    "content",
    "actions",
    "class",
    "children",
  ])

  return (
    <div
      class={`ui-card ${local.variant ? `ui-${local.variant}` : ""} ${local.class || ""}`.trim()}
      {...rest}
    >
      <Show when={local.header}>
        <hgroup>{local.header}</hgroup>
      </Show>

      <Show when={local.content}>
        <div class="ui-content">{local.content}</div>
      </Show>

      {local.children}

      <Show when={local.actions}>
        <div class={`ui-actions ${local.actionsAlign ? `ui-align-${local.actionsAlign}` : ""}`.trim()}>
          {local.actions}
        </div>
      </Show>
    </div>
  )
}
