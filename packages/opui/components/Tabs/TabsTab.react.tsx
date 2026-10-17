"use client"

import { cx } from "../cx"
import { useTabsContext } from "./context.react"
import type { TabsTabProps as Props } from "./types.react"

export default function TabsTab({ className, tabId, ...rest }: Props) {
  const tabs = useTabsContext()

  return (
    <label
      className={cx(["ui-tab-label", className])}
      htmlFor={tabId || tabs?.tabId}
      {...rest}
    />
  )
}
