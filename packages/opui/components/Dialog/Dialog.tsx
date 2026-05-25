/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Dialog(props: Props) {
  const [local, rest] = splitProps(props, [
    "actionsAlign",
    "closedby",
    "header",
    "content",
    "actions",
    "class",
    "children",
  ])

  return (
    <dialog
      /* @ts-ignore: closedby might not be typed in all environments */
      closedby={local.closedby}
      class={`ui-dialog ui-card ui-elevated ${local.class || ""}`.trim()}
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
    </dialog>
  )
}
