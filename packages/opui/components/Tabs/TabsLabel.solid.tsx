/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { useTabsContext } from "./context.solid"
import type { TabsLabelProps as Props } from "./types.solid"

export default function TabsLabel(props: Props) {
  const rest = omit(props, "class", "for", "children")
  const tabs = useTabsContext()

  return (
    <label
      for={props.for || tabs?.tabId}
      class={["ui-label", props.class]}
      {...rest}
    >
      {props.children}
    </label>
  )
}
