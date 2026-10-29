"use client"

import { cx } from "../cx"
import { useTabsContext } from "./context.react"
import type { TabsLabelProps as Props } from "./types.react"

export default function TabsLabel({ className, htmlFor, ...rest }: Props) {
  const tabs = useTabsContext()

  return (
    <label
      className={cx(["ui-label", className])}
      htmlFor={htmlFor || tabs?.tabId}
      {...rest}
    />
  )
}
