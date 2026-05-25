/* @jsxImportSource solid-js */
import { splitProps, type JSX, useContext } from "solid-js"
import { CurrentTabIdContext, CurrentPanelIdContext } from "./TabsItem"
import type { TabsPanelProps } from "./types.solid"

export default function TabsPanel(props: TabsPanelProps) {
  const [local, rest] = splitProps(props, ["panelId", "tabId", "class", "children"])

  const currentPanelId = useContext(CurrentPanelIdContext)
  const currentTabId = useContext(CurrentTabIdContext)

  return (
    <div
      id={local.panelId || currentPanelId}
      class={`ui-tab-panel ${local.class || ""}`.trim()}
      role="tabpanel"
      aria-labelledby={local.tabId || currentTabId}
      {...rest}
    >
      {local.children}
    </div>
  )
}
