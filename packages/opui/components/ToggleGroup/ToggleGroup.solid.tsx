/** @jsxImportSource @solidjs/web */
import { createSignal, createUniqueId, omit } from "solid-js"
import { ToggleGroupContext } from "./context.solid"
import { selectionOf } from "./selection"
import { createId } from "../id"
import type { Props } from "./types.solid"

export default function ToggleGroup(props: Props) {
  const rest = omit(
    props,
    "class",
    "multiple",
    "name",
    "onValueChange",
    "orientation",
    "overflow",
    "size",
    "value",
    "children",
  )
  const uid = createUniqueId()
  const [selected, setSelected] = createSignal(() => props.value)
  const change = (input: HTMLInputElement) => {
    const next = selectionOf(input, props.multiple)
    if (selected() !== undefined) setSelected(next)
    props.onValueChange?.(next as never)
  }
  const idOf = createId(uid)
  const groupName = () => props.name || idOf("toggle-group")
  const inputType = () => (props.multiple ? "checkbox" : "radio")

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
          return selected()
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
        role={props.multiple ? "group" : "radiogroup"}
        {...rest}
      >
        {props.children}
      </div>
    </ToggleGroupContext>
  )
}
