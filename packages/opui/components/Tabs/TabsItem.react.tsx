"use client"

import { useId } from "react"
import { cx } from "../cx"
import { TabsContext, useTabsContext } from "./context.react"
import type { TabsItemProps as Props } from "./types.react"

export default function TabsItem({
  className,
  name,
  tabId,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const parent = useTabsContext()
  const groupName = name || parent?.groupName || `tabs-${uid}`
  const computedTabId = tabId || `tab-${uid}`

  return (
    <TabsContext value={{ groupName, tabId: computedTabId }}>
      <input
        className={cx(["ui-input", className])}
        id={computedTabId}
        name={groupName}
        type="radio"
        {...rest}
      />
      {children}
    </TabsContext>
  )
}
