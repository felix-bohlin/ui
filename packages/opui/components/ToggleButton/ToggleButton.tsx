import { createUniqueId, omit, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import { ToggleGroupContext } from "../ToggleGroup/context"
import type { Props } from "./types.solid"

export default function ToggleButton(props: Props) {
  const rest = omit(
    props,
    "children",
    "class",
    "disabled",
    "id",
    "label",
    "name",
    "pressed",
    "size",
    "type",
    "value",
  )

  const group = useContext(ToggleGroupContext)
  const field = useContext(FieldGroupContext)
  const uid = createUniqueId()
  const finalName = () => props.name || group.name || field.name
  const finalType = () =>
    group.type === "radio" ? "radio" : props.type || group.type || "checkbox"

  return (
    <label
      class={[
        "ui-toggle-button",
        { "ui-disabled": props.disabled },
        props.size && `ui-${props.size}`,
        props.class,
      ]}
    >
      <input
        checked={props.pressed}
        disabled={props.disabled}
        id={props.id || uid}
        name={finalName()}
        type={finalType()}
        value={props.value || props.label}
        {...rest}
      />
      {props.children ?? props.label}
    </label>
  )
}
