/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import SwitchInput from "./SwitchInput"
import type { SwitchProps } from "./types.solid"

export default function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
    "critical",
    "hideLabel",
    "small",
    "spread",
    "stack",
    "iconUnchecked",
    "iconChecked",
    "endText",
    "class",
    "children",
  ])

  const endTextId = createUniqueId()

  return (
    <label
      class={`ui-switch ${local.small ? "ui-small" : ""} ${local.stack ? "ui-stack" : ""} ${local.spread ? "ui-spread" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <Show when={local.iconUnchecked}>
        <span class="ui-icon-unchecked" aria-hidden="true">
          {local.iconUnchecked}
        </span>
      </Show>

      <Show when={local.iconChecked}>
        <span class="ui-icon-checked" aria-hidden="true">
          {local.iconChecked}
        </span>
      </Show>

      <SwitchInput
        aria-describedby={local.endText ? endTextId : undefined}
        {...rest}
      />

      <Show when={local.children}>
        <span class={local.hideLabel ? "ui-sr-only" : "ui-label"}>
          {local.children}
        </span>
      </Show>

      <Show when={local.endText}>
        <span id={endTextId} class="ui-end-text">
          {local.endText}
        </span>
      </Show>
    </label>
  )
}
