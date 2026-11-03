"use client"

import { useId } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import { createId } from "../id"
import type { Props } from "./types.react"

export default function Tabs({
  className,
  name,
  overflow,
  value,
  variant,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const $id = createId(uid)
  const groupName = name || $id("tabs")

  return (
    <TabsContext value={{ groupName, value }}>
      <div
        className={cx([
          "ui-tabs",
          overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
          variant && variant !== "tonal" && `ui-${variant}`,
          className,
        ])}
        {...rest}
      >
        {children}
      </div>
    </TabsContext>
  )
}
