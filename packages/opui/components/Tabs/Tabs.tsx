/* @jsxImportSource solid-js */
import { splitProps, type JSX, createContext, createUniqueId } from "solid-js"
import type { Props } from "./types.solid"

export const TabsGroupNameContext = createContext<string>()

export default function Tabs(props: Props) {
  const [local, rest] = splitProps(props, ["name", "class", "children"])
  const groupName = () => local.name || createUniqueId()

  return (
    <TabsGroupNameContext.Provider value={groupName()}>
      <div class={`ui-tabs ${local.class || ""}`.trim()} role="tablist" {...rest}>
        {local.children}
      </div>
    </TabsGroupNameContext.Provider>
  )
}
