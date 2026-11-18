/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { TabsContext, useTabsContext } from "./context.solid"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import { callHandler, checkedProps, seedChecked } from "../solid"
import type { TabsItemProps as Props } from "./types.solid"

export default function TabsItem(props: Props) {
  const rest = omit(
    props,
    "checked",
    "class",
    "defaultChecked",
    "id",
    "name",
    "onChange",
    "ref",
    "value",
    "children",
  )
  const parent = useTabsContext()
  const uid = createUniqueId()
  const groupName = () => props.name || parent?.groupName || `tabs-${uid}`
  const tabId = () => props.id || `tab-${uid}`
  const grouped = () => isSelected(parent?.value, props.value)
  untrack(() =>
    warnGroupedChecked(
      "TabsItem",
      grouped(),
      props.checked ?? props.defaultChecked,
      "Tabs",
    ),
  )
  const initialChecked = untrack(
    () => grouped() ?? props.checked ?? props.defaultChecked,
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
        {...checkedProps(grouped() ?? props.checked, initialChecked)}
        class={["ui-input", props.class]}
        id={tabId()}
        name={groupName()}
        type="radio"
        value={props.value}
        {...defined(rest)}
        ref={[props.ref, seedChecked((input) => parent?.change?.(input))]}
        onChange={(event) => {
          parent?.change?.(event.currentTarget)
          callHandler(props.onChange, event)
        }}
      />
      {props.children}
    </TabsContext>
  )
}
