/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import { useToggleGroupContext } from "../ToggleGroup/context.solid"
import { isSelected } from "../ToggleGroup/selection"
import { DEV, warnGroupedChecked } from "../dev"
import { callHandler, control } from "../solid"
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
  const group = useToggleGroupContext()
  const finalName = () => props.name || group?.groupName
  const finalType = () =>
    group?.inputType === "radio" ? "radio" : (props.type ?? "checkbox")
  const grouped = () => isSelected(group?.value, props.value)
  if (DEV)
    untrack(() =>
      warnGroupedChecked(
        "ToggleButton",
        grouped(),
        props.checked ?? props.defaultChecked,
        "ToggleGroup",
      ),
    )
  const checkedControl = control(
    () => grouped() ?? props.checked,
    () => isSelected(group?.defaultValue, props.value) ?? props.defaultChecked,
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
        {...checkedControl.server}
        name={finalName()}
        type={finalType()}
        value={props.value}
        {...rest}
        ref={[props.ref, checkedControl.ref]}
        onChange={(event) => {
          group?.change?.(event.currentTarget)
          callHandler(props.onChange, event)
        }}
      />{" "}
      {resolvedChildren() === undefined ? props.label : resolvedChildren()}
    </label>
  )
}
