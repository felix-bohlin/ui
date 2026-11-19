"use client"

import { useCallback, useId, useMemo, useState } from "react"
import { cx } from "../cx"
import { ToggleGroupContext } from "./context.react"
import { checkedValues, selectionOf } from "./selection"
import { warnUnnamedGroup } from "../dev"
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
  const [inner, setInner] = useState(defaultValue)
  const change = useCallback(
    (input: HTMLInputElement) => {
      const next = selectionOf(input, multiple)
      setInner((current) => (current === undefined ? current : next))
      if (multiple) onValueChange?.(checkedValues(input))
      else onValueChange?.(input.value)
    },
    [multiple, onValueChange],
  )
  const groupName = name || `toggle-group-${uid}`
  const inputType = multiple ? "checkbox" : "radio"
  warnUnnamedGroup("ToggleGroup", rest)
  const context = useMemo<Context>(
    () => ({ change, groupName, inputType, value: value ?? inner }),
    [change, groupName, inner, inputType, value],
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
