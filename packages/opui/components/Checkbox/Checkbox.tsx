import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import CheckboxInput from "./CheckboxInput"
import type { CheckboxProps } from "./types.solid"

export default function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, [
    "critical",
    "hideLabel",
    "indeterminate",
    "size",
    "spread",
    "stack",
    "endText",
    "class",
    "children",
  ])

  const endTextId = createUniqueId()

  return (
    <label
      class={`ui-checkbox ${local.size ? `ui-${local.size}` : ""} ${local.stack ? "ui-stack" : ""} ${local.spread ? "ui-spread" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <CheckboxInput
        indeterminate={local.indeterminate}
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
