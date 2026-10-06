import { omit } from "solid-js"
import type { TabsPanelProps } from "./types.solid"

export default function TabsPanel(props: TabsPanelProps) {
  const rest = omit(props, "children", "class")

  return (
    <div class={["ui-tab-panel", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
