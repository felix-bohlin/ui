import { omit, Show } from "solid-js"
import type { Props } from "./types.solid"

export default function Card(props: Props) {
  const rest = omit(
    props,
    "actions",
    "actionsAlign",
    "children",
    "class",
    "content",
    "header",
    "variant",
  )

  return (
    <div
      class={["ui-card", props.variant && `ui-${props.variant}`, props.class]}
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
    </div>
  )
}
