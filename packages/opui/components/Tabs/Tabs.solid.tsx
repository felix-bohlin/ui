/** @jsxImportSource @solidjs/web */
import { createSignal, createUniqueId, omit, untrack } from "solid-js"
import { TabsContext } from "./context.solid"
import { warnUnnamedGroup } from "../dev"
import type { Props } from "./types.solid"

export default function Tabs(props: Props) {
  const rest = omit(
    props,
    "class",
    "defaultValue",
    "name",
    "onValueChange",
    "orientation",
    "overflow",
    "role",
    "value",
    "variant",
    "children",
  )
  const uid = createUniqueId()
  const [inner, setInner] = createSignal(untrack(() => props.defaultValue))
  const change = (input: HTMLInputElement) => {
    const next = input.value
    if (inner() !== undefined) setInner(next)
    props.onValueChange?.(next)
  }
  const groupName = () => props.name || `tabs-${uid}`
  untrack(() => {
    if (props.role === "radiogroup") warnUnnamedGroup("Tabs", rest)
  })

  return (
    <TabsContext
      value={{
        change,
        get groupName() {
          return groupName()
        },
        get value() {
          return props.value ?? inner()
        },
      }}
    >
      <div
        class={[
          "ui-tabs",
          props.orientation === "vertical" && "ui-vertical",
          props.overflow &&
            props.overflow !== "scroll" &&
            `ui-overflow-${props.overflow}`,
          props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
          props.class,
        ]}
        role={props.role}
        {...rest}
      >
        {props.children}
      </div>
    </TabsContext>
  )
}
