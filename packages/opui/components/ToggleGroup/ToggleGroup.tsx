import { createUniqueId, merge, omit } from "solid-js"
import { ToggleGroupContext } from "./context.solid"
import type { Props } from "./types.solid"

export default function ToggleGroup(rawProps: Props) {
  const props = merge({ selection: "multiple", size: "default" }, rawProps)
  const rest = omit(
    props,
    "children",
    "class",
    "name",
    "orientation",
    "selection",
    "size",
  )

  const uid = createUniqueId()
  const groupName = () => props.name || uid
  const inputType = () => (props.selection === "single" ? "radio" : "checkbox")

  return (
    <ToggleGroupContext
      value={{
        get groupName() {
          return groupName()
        },
        get inputType() {
          return inputType()
        },
      }}
    >
      <div
        class={[
          "ui-toggle-group",
          props.size !== "default" && props.size && `ui-${props.size}`,
          props.orientation && `ui-${props.orientation}`,
          props.class,
        ]}
        role={props.selection === "single" ? "radiogroup" : "group"}
        {...rest}
      >
        {props.children}
      </div>
    </ToggleGroupContext>
  )
}
