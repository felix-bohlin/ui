"use client"

import { useId, useMemo } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { TabsContext, useTabsContext } from "./context.react"
import { isSelected } from "../ToggleGroup/selection"
import { DEV, warnGroupedChecked } from "../dev"
import type { TabsItemProps as Props } from "./types.react"
import type { Context } from "./types"

export default function TabsItem({
  checked,
  className,
  defaultChecked,
  id,
  name,
  onChange,
  ref,
  value,
  children,
  ...rest
}: Props) {
  const parent = useTabsContext()
  const uid = useId()
  const groupName = name || parent?.groupName || `tabs-${uid}`
  const tabId = id || `tab-${uid}`
  const grouped = isSelected(parent?.value, value)
  if (DEV)
    warnGroupedChecked("TabsItem", grouped, checked ?? defaultChecked, "Tabs")
  const attrs = defined(rest)
  const context = useMemo<Context>(
    () => ({ groupName, tabId }),
    [groupName, tabId],
  )

  return (
    <TabsContext value={context}>
      <input
        checked={grouped ?? checked}
        defaultChecked={
          grouped !== undefined
            ? undefined
            : checked === undefined
              ? (isSelected(parent?.defaultValue, value) ?? defaultChecked)
              : defaultChecked
        }
        className={cx(["ui-input", className])}
        id={tabId}
        name={groupName}
        type="radio"
        value={value}
        {...attrs}
        ref={ref}
        onChange={(event) => {
          parent?.change?.(event.currentTarget)
          onChange?.(event)
        }}
      />
      {children}
    </TabsContext>
  )
}
