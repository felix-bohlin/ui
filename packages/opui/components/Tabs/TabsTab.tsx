/* @jsxImportSource solid-js */
import { splitProps, type JSX, useContext } from "solid-js"
import { CurrentTabIdContext } from "./TabsItem"
import type { TabsTabProps } from "./types.solid"

export default function TabsTab(props: TabsTabProps) {
  const [local, rest] = splitProps(props, ["tabId", "class", "children"])

  const currentTabId = useContext(CurrentTabIdContext)

  return (
    <label
      for={local.tabId || currentTabId}
      class={`ui-tab-label ${local.class || ""}`.trim()}
      role="tab"
      {...rest}
    >
      {local.children}
    </label>
  )
}
