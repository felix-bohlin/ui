import { splitProps, type JSX, createContext, useContext, createUniqueId } from "solid-js"
import { TabsGroupNameContext } from "./Tabs"
import type { TabsItemProps } from "./types.solid"

export const CurrentTabIdContext = createContext<string>()
export const CurrentPanelIdContext = createContext<string>()

export default function TabsItem(props: TabsItemProps) {
  const [local, rest] = splitProps(props, [
    "name",
    "open",
    "panelId",
    "tabId",
    "class",
    "children",
  ])

  const contextGroupName = useContext(TabsGroupNameContext)
  const tabsGroupName = () => local.name || contextGroupName || createUniqueId()
  const computedTabId = () => local.tabId || createUniqueId()
  const computedPanelId = () => local.panelId || createUniqueId()

  return (
    <TabsGroupNameContext.Provider value={tabsGroupName()}>
      <CurrentTabIdContext.Provider value={computedTabId()}>
        <CurrentPanelIdContext.Provider value={computedPanelId()}>
          <input
            aria-controls={computedPanelId()}
            checked={local.open}
            class={`ui-tab-input ${local.class || ""}`.trim()}
            id={computedTabId()}
            name={tabsGroupName()}
            type="radio"
            {...rest}
          />
          {local.children}
        </CurrentPanelIdContext.Provider>
      </CurrentTabIdContext.Provider>
    </TabsGroupNameContext.Provider>
  )
}
