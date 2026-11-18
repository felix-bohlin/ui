"use client"

import { cx } from "../cx"
import { useTabsContext } from "./context.react"
import type { TabsLabelProps as Props } from "./types.react"

export default function TabsLabel({
  className,
  htmlFor,
  children,
  ...rest
}: Props) {
  const tabs = useTabsContext()

  return (
    <label
      htmlFor={htmlFor || tabs?.tabId}
      className={cx(["ui-label", className])}
      {...rest}
    >
      {children}
    </label>
  )
}
