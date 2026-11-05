/** @jsxImportSource @solidjs/web */
import { createSignal, createUniqueId, omit } from "solid-js"
import { TabsContext } from "./context.solid"
import { createId } from "../id"
import type { Props } from "./types.solid"

export default function Tabs(props: Props) {
  const rest = omit(
    props,
    "class",
    "name",
    "onValueChange",
    "overflow",
    "value",
    "variant",
    "children",
  )
  const uid = createUniqueId()
  const [selected, setSelected] = createSignal(() => props.value)
  const change = (input: HTMLInputElement) => {
    const next = input.value
    if (selected() !== undefined) setSelected(next)
    props.onValueChange?.(next)
  }
  const idOf = createId(uid)
  const groupName = () => props.name || idOf("tabs")

  return (
    <TabsContext
      value={{
        change,
        get groupName() {
          return groupName()
        },
        get value() {
          return selected()
        },
      }}
    >
      <div
        class={[
          "ui-tabs",
          props.overflow &&
            props.overflow !== "wrap" &&
            `ui-overflow-${props.overflow}`,
          props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
          props.class,
        ]}
        {...rest}
      >
        {props.children}
      </div>
    </TabsContext>
  )
}
