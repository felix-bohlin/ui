import { omit, useContext } from "solid-js"
import { CurrentPanelIdContext, CurrentTabIdContext } from "./context"
import type { TabsPanelProps } from "./types.solid"

export default function TabsPanel(props: TabsPanelProps) {
  const rest = omit(props, "children", "class", "panelId", "tabId")

  const currentPanelId = useContext(CurrentPanelIdContext)
  const currentTabId = useContext(CurrentTabIdContext)

  return (
    <div
      id={props.panelId || currentPanelId()}
      class={["ui-tab-panel", props.class]}
      role="tabpanel"
      aria-labelledby={props.tabId || currentTabId()}
      {...rest}
    >
      {props.children}
    </div>
  )
}
