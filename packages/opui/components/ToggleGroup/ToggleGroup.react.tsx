"use client"

import { useId, useState } from "react"
import { cx } from "../cx"
import { ToggleGroupContext } from "./context.react"
import { selectionOf } from "./selection"
import type { Props } from "./types.react"

export default function ToggleGroup({
  className,
  defaultValue,
  name,
  onValueChange,
  orientation,
  scrollable,
  selection = "multiple",
  shrink,
  size,
  value,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const groupName = name || `toggle-group-${uid}`
  const inputType = selection === "single" ? "radio" : "checkbox"
  const [inner, setInner] = useState(defaultValue)

  const change = (input: HTMLInputElement) => {
    const next = selectionOf(input, selection)
    if (inner !== undefined) setInner(next)
    onValueChange?.(next as never)
  }

  return (
    <ToggleGroupContext
      value={{ change, groupName, inputType, value: value ?? inner }}
    >
      <div
        className={cx([
          "ui-toggle-group",
          {
            "ui-scrollable": scrollable,
            "ui-shrink": shrink,
            "ui-vertical": orientation === "vertical",
          },
          size && size !== "medium" && `ui-${size}`,
          className,
        ])}
        role={selection === "single" ? "radiogroup" : "group"}
        {...rest}
      >
        {children}
      </div>
    </ToggleGroupContext>
  )
}
