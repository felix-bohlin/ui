import { createUniqueId, omit, Show } from "solid-js"
import SwitchInput from "./SwitchInput"
import type { SwitchProps } from "./types.solid"

export default function Switch(props: SwitchProps) {
  const rest = omit(
    props,
    "children",
    "class",
    "endText",
    "error",
    "hideLabel",
    "iconChecked",
    "iconUnchecked",
    "name",
    "small",
    "spread",
    "stack",
  )

  const uid = createUniqueId()
  const endTextId = () => (props.endText ? uid : undefined)

  return (
    <label
      class={[
        "ui-switch",
        {
          "ui-small": !!props.small,
          "ui-stack": !!props.stack,
          "ui-spread": !!props.spread,
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
      <SwitchInput aria-describedby={endTextId()} name={props.name} {...rest} />
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
