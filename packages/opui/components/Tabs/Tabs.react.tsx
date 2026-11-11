"use client"

import { useId, useState } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import type { Props } from "./types.react"

export default function Tabs({
  className,
  defaultValue,
  name,
  onValueChange,
  orientation,
  overflow,
  value,
  variant,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const [inner, setInner] = useState(defaultValue)
  const change = (input: HTMLInputElement) => {
    const next = input.value
    if (inner !== undefined) setInner(next)
    onValueChange?.(next)
  }
  const groupName = name || `tabs-${uid}`

  return (
    <TabsContext value={{ change, groupName, value: value ?? inner }}>
      <div
        className={cx([
          "ui-tabs",
          orientation === "vertical" && "ui-vertical",
          overflow && overflow !== "scroll" && `ui-overflow-${overflow}`,
          variant && variant !== "tonal" && `ui-${variant}`,
          className,
        ])}
        role="radiogroup"
        {...defined(rest)}
      >
        {children}
      </div>
    </TabsContext>
  )
}
