import { createUniqueId, merge, omit } from "solid-js"
import { ToggleGroupContext } from "./context"
import type { Props } from "./types.solid"

export default function ToggleGroup(rawProps: Props) {
  const props = merge({ selection: "multiple", size: "default" }, rawProps)
  const rest = omit(
    props,
    "children",
    "class",
    "name",
    "orientation",
    "scrollable",
    "selection",
    "shrink",
    "size",
  )

  const uid = createUniqueId()

  return (
    <ToggleGroupContext
      value={{
        get name() {
          return props.name || uid
        },
        get type() {
          return props.selection === "single" ? "radio" : "checkbox"
        },
      }}
    >
      <div
        class={[
          "ui-toggle-group",
          props.size !== "default" && props.size && `ui-${props.size}`,
          props.orientation && `ui-${props.orientation}`,
          { "ui-scrollable": props.scrollable, "ui-shrink": props.shrink },
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
