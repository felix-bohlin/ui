/** @jsxImportSource @solidjs/web */
import { createSignal, createUniqueId, omit, untrack } from "solid-js"
import { ToggleGroupContext } from "./context.solid"
import { selectionOf } from "./selection"
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
  const [inner, setInner] = createSignal(untrack(() => props.defaultValue))
  const change = (input: HTMLInputElement) => {
    const next = selectionOf(input, props.multiple)
    if (inner() !== undefined) setInner(next)
    props.onValueChange?.(next as never)
  }
  const groupName = () => props.name || `toggle-group-${uid}`
  const inputType = () => (props.multiple ? "checkbox" : "radio")
  untrack(() => {
    warnUnnamedGroup("ToggleGroup", rest)
  })

  return (
    <ToggleGroupContext
      value={{
        change,
        get groupName() {
          return groupName()
        },
        get inputType() {
          return inputType()
        },
        get value() {
          return props.value ?? inner()
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
