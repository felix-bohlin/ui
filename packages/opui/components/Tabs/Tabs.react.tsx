"use client"

import { useCallback, useId, useMemo } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import { DEV, warnUnnamedGroup } from "../dev"
import type { Props } from "./types.react"
import type { Context } from "./types"

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
  const change = useCallback(
    (input: HTMLInputElement) => {
      onValueChange?.(input.value)
    },
    [onValueChange],
  )
  const groupName = name || `tabs-${uid}`
  if (DEV && role === "radiogroup") warnUnnamedGroup("Tabs", rest)
  const context = useMemo<Context>(
    () => ({ change, defaultValue, groupName, value }),
    [change, defaultValue, groupName, value],
  )

  return (
    <TabsContext value={context}>
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
