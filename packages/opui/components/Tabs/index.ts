import TabsOrig from "./Tabs.astro"
import TabsItem from "./TabsItem.astro"
import TabsTab from "./TabsTab.astro"
import TabsPanel from "./TabsPanel.astro"

export { TabsItem, TabsTab as Tab, TabsPanel as Panel }

const Tabs = Object.assign(TabsOrig, {
  Item: TabsItem,
  Tab: TabsTab,
  Panel: TabsPanel,
})

export default Tabs as any
