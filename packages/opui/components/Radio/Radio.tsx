import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import RadioInput from "./RadioInput"
import type { RadioProps } from "./types.solid"

export default function Radio(props: RadioProps) {
  const [local, rest] = splitProps(props, [
    "critical",
    "hideLabel",
    "size",
    "stack",
    "endText",
    "class",
    "children",
  ])

  const endTextId = createUniqueId()

  return (
    <label
      class={`ui-radio ${local.size ? `ui-${local.size}` : ""} ${local.stack ? "ui-stack" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <RadioInput
        aria-describedby={local.endText ? endTextId : undefined}
        {...rest}
      />
      <span class={local.hideLabel ? "ui-sr-only" : "ui-label"}>{local.children}</span>
      <Show when={local.endText}>
        <span id={endTextId} class="ui-end-text">
          {local.endText}
        </span>
      </Show>
    </label>
  )
}
