import { createUniqueId, omit, Show } from "solid-js"
import SwitchInput from "./SwitchInput"
import type { SwitchProps } from "./types.solid"

export default function Switch(props: SwitchProps) {
  const rest = omit(
    props,
    "aria-describedby",
    "children",
    "class",
    "endText",
    "error",
    "hideLabel",
    "iconChecked",
    "iconUnchecked",
    "name",
    "size",
    "spread",
    "stack",
  )

  const id = createUniqueId()
  const endTextId = () => (props.endText ? id : undefined)
  const describedBy = () =>
    [endTextId(), props["aria-describedby"]].filter(Boolean).join(" ") ||
    undefined

  return (
    <label
      class={[
        "ui-switch",
        props.size && `ui-${props.size}`,
        {
          "ui-spread": props.spread,
          "ui-stack": props.stack,
        },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
    >
      <Show when={props.iconUnchecked}>
        <span class="ui-icon-unchecked" aria-hidden="true">
          {props.iconUnchecked}
        </span>
      </Show>
      <Show when={props.iconChecked}>
        <span class="ui-icon-checked" aria-hidden="true">
          {props.iconChecked}
        </span>
      </Show>
      <SwitchInput
        {...rest}
        aria-describedby={describedBy()}
        aria-invalid={props.error ? "true" : undefined}
        name={props.name}
      />
      <Show when={props.children}>
        <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
          {props.children}
        </span>
      </Show>
      <Show when={props.endText}>
        <span id={endTextId()} class="ui-end-text">
          {props.endText}
        </span>
      </Show>
    </label>
  )
}
