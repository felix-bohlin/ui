import { omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Dialog(props: Props) {
  const rest = omit(
    props,
    "actions",
    "actionsAlign",
    "children",
    "class",
    "content",
    "header",
  )

  return (
    <dialog
      class={["ui-dialog", "ui-card", "ui-elevated", props.class]}
      {...rest}
    >
      <Show when={props.header}>
        <hgroup>{props.header}</hgroup>
      </Show>

      <Show when={props.content}>
        <div class="ui-content">{props.content}</div>
      </Show>

      {props.children}

      <Show when={props.actions}>
        <div
          class={[
            "ui-actions",
            props.actionsAlign && `ui-align-${props.actionsAlign}`,
          ]}
        >
          {props.actions}
        </div>
      </Show>
    </dialog>
  )
}
