"use client"

import { useId, useState } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import { createId } from "../id"
import type { Props } from "./types.react"

export default function Tabs({
  className,
  defaultValue,
  name,
  onValueChange,
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
  const idOf = createId(uid)
  const groupName = name || idOf("tabs")

  return (
    <TabsContext value={{ change, groupName, value: value ?? inner }}>
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
