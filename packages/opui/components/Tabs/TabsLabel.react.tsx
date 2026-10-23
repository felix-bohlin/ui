"use client"

import { cx } from "../cx"
import { useTabsContext } from "./context.react"
import type { TabsLabelProps as Props } from "./types.react"

export default function TabsLabel({ className, tabId, ...rest }: Props) {
  const tabs = useTabsContext()

  return (
    <label
      className={cx(["ui-label", className])}
      htmlFor={tabId || tabs?.tabId}
      {...rest}
    />
  )
}
