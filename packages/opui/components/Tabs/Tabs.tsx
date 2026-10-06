import { createUniqueId, omit } from "solid-js"
import { TabsGroupNameContext } from "./context"
import type { Props } from "./types.solid"

export default function Tabs(props: Props) {
  const rest = omit(props, "children", "class", "name", "scrollable", "variant")

  const uid = createUniqueId()
  const groupName = () => props.name || uid

  return (
    <TabsGroupNameContext value={groupName}>
      <div
        class={[
          "ui-tabs",
          { "ui-scrollable": props.scrollable },
          props.variant && `ui-${props.variant}`,
          props.class,
        ]}
        {...rest}
      >
        {props.children}
      </div>
    </TabsGroupNameContext>
  )
}
