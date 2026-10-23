"use client"

import { useId } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import type { Props } from "./types.react"

export default function Tabs({
  className,
  name,
  scrollable,
  variant,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const groupName = name || `tabs-${uid}`

  return (
    <TabsContext value={{ groupName }}>
      <div
        className={cx([
          "ui-tabs",
          { "ui-scrollable": scrollable },
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
