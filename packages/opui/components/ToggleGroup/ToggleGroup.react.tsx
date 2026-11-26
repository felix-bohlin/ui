"use client"

import { useCallback, useId, useMemo } from "react"
import { cx } from "../cx"
import { ToggleGroupContext } from "./context.react"
import { checkedValues } from "./selection"
import { DEV, warnUnnamedGroup } from "../dev"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function ToggleGroup({
  className,
  defaultValue,
  multiple,
  name,
  onValueChange,
  orientation,
  overflow,
  role,
  size,
  value,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const change = useCallback(
    (input: HTMLInputElement) => {
      if (multiple) onValueChange?.(checkedValues(input))
      else onValueChange?.(input.value)
    },
    [multiple, onValueChange],
  )
  const groupName = name || `toggle-group-${uid}`
  const inputType = multiple ? "checkbox" : "radio"
  if (DEV) warnUnnamedGroup("ToggleGroup", rest)
  const context = useMemo<Context>(
    () => ({ change, defaultValue, groupName, inputType, value }),
    [change, defaultValue, groupName, inputType, value],
  )

  return (
    <ToggleGroupContext value={context}>
      <div
        className={cx([
          "ui-toggle-group",
          { "ui-vertical": orientation === "vertical" },
          overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
          size && size !== "medium" && `ui-${size}`,
          className,
        ])}
        role={role ?? (multiple ? "group" : "radiogroup")}
        {...rest}
      >
        {children}
      </div>
    </ToggleGroupContext>
  )
}
