"use client"

import { useId, useState } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import { warnUnnamedGroup } from "../dev"
import type { Props } from "./types.react"

export default function Tabs({
  className,
  defaultValue,
  name,
  onValueChange,
  orientation,
  overflow,
  role,
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
  if (role === "radiogroup") warnUnnamedGroup("Tabs", rest)

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
        role={role}
        {...rest}
      >
        {children}
      </div>
    </TabsContext>
  )
}
