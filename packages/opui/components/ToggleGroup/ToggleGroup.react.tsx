"use client"

import { useId, useState } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { ToggleGroupContext } from "./context.react"
import { selectionOf } from "./selection"
import { warnUnnamedGroup } from "../dev"
import type { Props } from "./types.react"

export default function ToggleGroup({
  className,
  defaultValue,
  multiple,
  name,
  onValueChange,
  orientation,
  overflow,
  size,
  value,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const [inner, setInner] = useState(defaultValue)
  const change = (input: HTMLInputElement) => {
    const next = selectionOf(input, multiple)
    if (inner !== undefined) setInner(next)
    onValueChange?.(next as never)
  }
  const groupName = name || `toggle-group-${uid}`
  const inputType = multiple ? "checkbox" : "radio"
  warnUnnamedGroup("ToggleGroup", rest)

  return (
    <ToggleGroupContext
      value={{ change, groupName, inputType, value: value ?? inner }}
    >
      <div
        className={cx([
          "ui-toggle-group",
          { "ui-vertical": orientation === "vertical" },
          overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
          size && size !== "medium" && `ui-${size}`,
          className,
        ])}
        role={multiple ? "group" : "radiogroup"}
        {...defined(rest)}
      >
        {children}
      </div>
    </ToggleGroupContext>
  )
}
