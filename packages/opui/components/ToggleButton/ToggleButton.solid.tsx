/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { useToggleGroupContext } from "../ToggleGroup/context.solid"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import { callHandler, checkedProps, seedChecked } from "../solid"
import type { Props } from "./types.solid"

export default function ToggleButton(props: Props) {
  const rest = omit(
    props,
    "checked",
    "class",
    "defaultChecked",
    "label",
    "name",
    "onChange",
    "ref",
    "size",
    "style",
    "type",
    "value",
    "children",
  )
  const resolvedChildren = children(() => props.children)
  const field = useFieldGroupContext()
  const group = useToggleGroupContext()
  const finalName = () => props.name || group?.groupName || field?.name
  const finalType = () =>
    group?.inputType === "radio" ? "radio" : (props.type ?? "checkbox")
  const grouped = () => isSelected(group?.value, props.value)
  untrack(() =>
    warnGroupedChecked(
      "ToggleButton",
      grouped(),
      props.checked ?? props.defaultChecked,
      "ToggleGroup",
    ),
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
        {...checkedProps(grouped() ?? props.checked, props.defaultChecked)}
        name={finalName()}
        type={finalType()}
        value={props.value}
        {...rest}
        ref={[props.ref, seedChecked((input) => group?.change?.(input))]}
        onChange={(event) => {
          group?.change?.(event.currentTarget)
          callHandler(props.onChange, event)
        }}
      />{" "}
      {resolvedChildren() === undefined ? props.label : resolvedChildren()}
    </label>
  )
}
