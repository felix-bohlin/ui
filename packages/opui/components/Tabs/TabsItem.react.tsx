"use client"

import { useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { TabsContext, useTabsContext } from "./context.react"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import type { TabsItemProps as Props } from "./types.react"

export default function TabsItem({
  checked,
  className,
  defaultChecked,
  id,
  name,
  onChange,
  value,
  children,
  ...rest
}: Props) {
  const parent = useTabsContext()
  const uid = useId()
  const groupName = name || parent?.groupName || `tabs-${uid}`
  const tabId = id || `tab-${uid}`
  const grouped = isSelected(parent?.value, value)
  warnGroupedChecked("TabsItem", grouped, checked ?? defaultChecked, "Tabs")

  return (
    <TabsContext value={{ groupName, tabId }}>
      <input
        checked={grouped ?? checked}
        defaultChecked={grouped === undefined ? defaultChecked : undefined}
        className={cx(["ui-input", className])}
        id={tabId}
        name={groupName}
        type="radio"
        value={value}
        {...defined(rest)}
        onChange={(event) => {
          parent?.change?.(event.currentTarget)
          onChange?.(event)
        }}
      />
      {children}
    </TabsContext>
  )
}
