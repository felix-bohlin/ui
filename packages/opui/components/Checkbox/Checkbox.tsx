import { createUniqueId, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import CheckboxInput from "./CheckboxInput"
import type { CheckboxProps } from "./types.solid"

export default function Checkbox(props: CheckboxProps) {
  const rest = omit(
    props,
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

  const fieldGroup = useContext(FieldGroupContext)
  const id = createUniqueId()
  const endTextId = () => (props.endText ? id : undefined)

  return (
    <label
      class={[
        "ui-checkbox",
        props.size && `ui-${props.size}`,
        {
          "ui-spread": !!props.spread,
          "ui-stack": !!props.stack,
        },
        props.class,
      ]}
      data-invalid={props.error || undefined}
    >
      <CheckboxInput
        aria-describedby={endTextId()}
        name={props.name || fieldGroup.name}
        {...rest}
      />
      <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
        {props.children}
      </span>
      <Show when={props.endText}>
        <span id={endTextId()} class="ui-end-text">
          {props.endText}
        </span>
      </Show>
    </label>
  )
}
