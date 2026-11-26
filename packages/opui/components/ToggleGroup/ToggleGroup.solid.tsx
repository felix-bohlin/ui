/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit, untrack } from "solid-js"
import { ToggleGroupContext } from "./context.solid"
import { checkedValues } from "./selection"
import { warnUnnamedGroup } from "../dev"
import type { Props } from "./types.solid"

export default function ToggleGroup(props: Props) {
  const rest = omit(
    props,
    "class",
    "defaultValue",
    "multiple",
    "name",
    "onValueChange",
    "orientation",
    "overflow",
    "role",
    "size",
    "value",
    "children",
  )
  const uid = createUniqueId()
  const change = (input: HTMLInputElement) => {
    if (props.multiple) props.onValueChange?.(checkedValues(input, props.value))
    else props.onValueChange?.(input.value)
  }
  untrack(() => {
    warnUnnamedGroup("ToggleGroup", rest)
  })

  return (
    <ToggleGroupContext
      value={{
        change,
        get defaultValue() {
          return props.defaultValue
        },
        get groupName() {
          return props.name || `toggle-group-${uid}`
        },
        get inputType() {
          return props.multiple ? "checkbox" : "radio"
        },
        get value() {
          return props.value
        },
      }}
    >
      <div
        class={[
          "ui-toggle-group",
          { "ui-vertical": props.orientation === "vertical" },
          props.overflow &&
            props.overflow !== "wrap" &&
            `ui-overflow-${props.overflow}`,
          props.size && props.size !== "medium" && `ui-${props.size}`,
          props.class,
        ]}
        role={props.role ?? (props.multiple ? "group" : "radiogroup")}
        {...rest}
      >
        {props.children}
      </div>
    </ToggleGroupContext>
  )
}
