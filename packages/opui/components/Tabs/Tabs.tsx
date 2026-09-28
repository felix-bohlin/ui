import { createUniqueId, omit } from "solid-js"
import { TabsGroupNameContext } from "./context"
import type { Props } from "./types.solid"

export default function Tabs(props: Props) {
  const rest = omit(props, "children", "class", "name")

  const uid = createUniqueId()
  const groupName = () => props.name || uid

  return (
    <TabsGroupNameContext value={groupName}>
      <div class={["ui-tabs", props.class]} role="tablist" {...rest}>
        {props.children}
      </div>
    </TabsGroupNameContext>
  )
}
