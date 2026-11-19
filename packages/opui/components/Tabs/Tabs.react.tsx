"use client"

import { useCallback, useId, useMemo, useState } from "react"
import { cx } from "../cx"
import { TabsContext } from "./context.react"
import { warnUnnamedGroup } from "../dev"
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
  const [inner, setInner] = useState(defaultValue)
  const change = useCallback(
    (input: HTMLInputElement) => {
      const next = input.value
      setInner((current) => (current === undefined ? current : next))
      onValueChange?.(next)
    },
    [onValueChange],
  )
  const groupName = name || `tabs-${uid}`
  if (role === "radiogroup") warnUnnamedGroup("Tabs", rest)
  const context = useMemo<Context>(
    () => ({ change, groupName, value: value ?? inner }),
    [change, groupName, inner, value],
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
