/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit, untrack } from "solid-js"
import { TabsContext, useTabsContext } from "./context.solid"
import { createId } from "../id"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import { callHandler } from "../solid"
import type { TabsItemProps as Props } from "./types.solid"

export default function TabsItem(props: Props) {
  const rest = omit(
    props,
    "checked",
    "class",
    "id",
    "name",
    "onChange",
    "value",
    "children",
  )
  const parent = useTabsContext()
  const uid = createUniqueId()
  const idOf = createId(uid)
  const groupName = () => props.name || parent?.groupName || idOf("tabs")
  const tabId = () => props.id || idOf("tab")
  const grouped = () => isSelected(parent?.value, props.value)
  untrack(() =>
    warnGroupedChecked("TabsItem", grouped(), props.checked, "Tabs"),
  )

  return (
    <TabsContext
      value={{
        get groupName() {
          return groupName()
        },
        get tabId() {
          return tabId()
        },
      }}
    >
      <input
        checked={grouped() ?? props.checked}
        class={["ui-input", props.class]}
        id={tabId()}
        name={groupName()}
        type="radio"
        value={props.value}
        {...rest}
        onChange={(event) => {
          parent?.change?.(event.currentTarget)
          callHandler(props.onChange, event)
        }}
      />
      {props.children}
    </TabsContext>
  )
}
