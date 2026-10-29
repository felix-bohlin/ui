"use client"

import { useId } from "react"
import { cx } from "../cx"
import { warnGroupedChecked } from "../dev"
import { isSelected } from "../ToggleGroup/selection"
import { TabsContext, useTabsContext } from "./context.react"
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
  const uid = useId()
  const parent = useTabsContext()
  const groupName = name || parent?.groupName || `tabs-${uid}`
  const tabId = id || `tab-${uid}`
  const grouped = isSelected(parent?.value, value)
  warnGroupedChecked("TabsItem", grouped, checked ?? defaultChecked, "Tabs")

  return (
    <TabsContext value={{ groupName, tabId }}>
      <input
        checked={grouped ?? checked}
        className={cx(["ui-input", className])}
        defaultChecked={grouped === undefined ? defaultChecked : undefined}
        id={tabId}
        name={groupName}
        type="radio"
        value={value}
        {...rest}
        onChange={(event) => {
          parent?.change?.(event.currentTarget)
          onChange?.(event)
        }}
      />
      {children}
    </TabsContext>
  )
}
