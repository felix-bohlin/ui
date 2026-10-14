"use client"

import { useId } from "react"
import { cx } from "../cx"
import { ToggleGroupContext } from "./context.react"
import type { Props } from "./types.react"

export default function ToggleGroup({
  className,
  name,
  orientation,
  scrollable,
  selection = "multiple",
  shrink,
  size,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const groupName = name || `toggle-group-${uid}`
  const inputType = selection === "single" ? "radio" : "checkbox"

  return (
    <ToggleGroupContext value={{ groupName, inputType }}>
      <div
        className={cx([
          "ui-toggle-group",
          size && `ui-${size}`,
          orientation && `ui-${orientation}`,
          { "ui-scrollable": scrollable, "ui-shrink": shrink },
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
