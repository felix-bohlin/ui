/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { TabsPanelProps as Props } from "./types.solid"

export default function TabsPanel(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-panel", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
