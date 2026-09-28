import { omit, useContext } from "solid-js"
import { CurrentTabIdContext } from "./context"
import type { TabsTabProps } from "./types.solid"

export default function TabsTab(props: TabsTabProps) {
  const rest = omit(props, "children", "class", "tabId")

  const currentTabId = useContext(CurrentTabIdContext)

  return (
    <label
      for={props.tabId || currentTabId()}
      class={["ui-tab-label", props.class]}
      role="tab"
      {...rest}
    >
      {props.children}
    </label>
  )
}
