import { createUniqueId, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import RadioInput from "./RadioInput"
import type { RadioProps } from "./types.solid"

export default function Radio(props: RadioProps) {
  const rest = omit(
    props,
    "children",
    "class",
    "endText",
    "error",
    "hideLabel",
    "name",
    "size",
    "stack",
  )

  const fieldGroup = useContext(FieldGroupContext)
  const id = createUniqueId()
  const endTextId = () => (props.endText ? id : undefined)

  return (
    <label
      class={[
        "ui-radio",
        props.size && `ui-${props.size}`,
        { "ui-stack": !!props.stack },
        props.class,
      ]}
      data-invalid={props.error || undefined}
    >
      <RadioInput
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
