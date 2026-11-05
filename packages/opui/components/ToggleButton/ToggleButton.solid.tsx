/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { useToggleGroupContext } from "../ToggleGroup/context.solid"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import { callHandler } from "../solid"
import type { Props } from "./types.solid"

export default function ToggleButton(props: Props) {
  const rest = omit(
    props,
    "checked",
    "class",
    "label",
    "name",
    "onChange",
    "size",
    "style",
    "type",
    "value",
    "children",
  )
  const field = useFieldGroupContext()
  const group = useToggleGroupContext()
  const finalName = () => props.name || group?.groupName || field?.name
  const finalType = () =>
    group?.inputType === "radio" ? "radio" : (props.type ?? "checkbox")
  const grouped = () => isSelected(group?.value, props.value)
  untrack(() =>
    warnGroupedChecked("ToggleButton", grouped(), props.checked, "ToggleGroup"),
  )

  return (
    <label
      class={[
        "ui-toggle-button",
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      <input
        checked={grouped() ?? props.checked}
        name={finalName()}
        type={finalType()}
        value={props.value}
        {...rest}
        onChange={(event) => {
          group?.change?.(event.currentTarget)
          callHandler(props.onChange, event)
        }}
      />{" "}
      {props.children === undefined ? props.label : props.children}
    </label>
  )
}
