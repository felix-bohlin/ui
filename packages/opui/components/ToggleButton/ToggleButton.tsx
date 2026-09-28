import { createUniqueId, omit, useContext } from "solid-js"
import { ToggleGroupContext } from "../ToggleGroup/context.solid"
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
  const uid = createUniqueId()
  const finalName = () => props.name || group?.groupName
  const finalType = () => props.type || group?.inputType || "checkbox"
  const inputId = () => props.id || uid
  const value = () => props.value || props.label

  return (
    <label
      class={[
        "ui-toggle-button",
        { "ui-disabled": !!props.disabled },
        props.size && `ui-${props.size}`,
        props.class,
      ]}
    >
      <input
        aria-pressed={
          finalType() === "checkbox" ? `${!!props.pressed}` : undefined
        }
        checked={props.pressed}
        disabled={props.disabled}
        id={inputId()}
        name={finalName()}
        type={finalType()}
        {...(value() ? { value: value() } : {})}
        {...rest}
      />
      {props.children}
    </label>
  )
}
