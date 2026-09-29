import { createUniqueId, omit, useContext } from "solid-js"
import {
  CurrentPanelIdContext,
  CurrentTabIdContext,
  TabsGroupNameContext,
} from "./context"
import type { TabsItemProps } from "./types.solid"

export default function TabsItem(props: TabsItemProps) {
  const rest = omit(
    props,
    "children",
    "class",
    "name",
    "open",
    "panelId",
    "tabId",
  )

  const parentGroupName = useContext(TabsGroupNameContext)
  const groupUid = createUniqueId()
  const panelUid = createUniqueId()
  const tabUid = createUniqueId()

  const groupName = () => props.name || parentGroupName() || groupUid
  const panelId = () => props.panelId || panelUid
  const tabId = () => props.tabId || tabUid

  return (
    <TabsGroupNameContext value={groupName}>
      <CurrentTabIdContext value={tabId}>
        <CurrentPanelIdContext value={panelId}>
          <input
            aria-controls={panelId()}
            checked={props.open}
            class={["ui-tab-input", props.class]}
            id={tabId()}
            name={groupName()}
            type="radio"
            {...rest}
          />
          {props.children}
        </CurrentPanelIdContext>
      </CurrentTabIdContext>
    </TabsGroupNameContext>
  )
}
