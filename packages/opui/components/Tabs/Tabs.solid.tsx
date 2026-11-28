/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit, untrack } from "solid-js"
import { TabsContext } from "./context.solid"
import { DEV, warnUnnamedGroup } from "../dev"
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
  const change = (input: HTMLInputElement) => {
    props.onValueChange?.(input.value)
  }
  if (DEV)
    untrack(() => {
      if (props.role === "radiogroup") warnUnnamedGroup("Tabs", rest)
    })

  return (
    <TabsContext
      value={{
        change,
        get defaultValue() {
          return props.defaultValue
        },
        get groupName() {
          return props.name || `tabs-${uid}`
        },
        get value() {
          return props.value
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
