import { createUniqueId, omit, Show } from "solid-js"
import CheckboxInput from "./CheckboxInput"
import type { CheckboxProps } from "./types.solid"

export default function Checkbox(props: CheckboxProps) {
  const rest = omit(
    props,
    "aria-describedby",
    "children",
    "class",
    "endText",
    "error",
    "hideLabel",
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
        "ui-checkbox",
        props.size && `ui-${props.size}`,
        {
          "ui-spread": props.spread,
          "ui-stack": props.stack,
        },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
    >
      <CheckboxInput
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
