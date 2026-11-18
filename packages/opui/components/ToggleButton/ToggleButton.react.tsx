"use client"

import { cx } from "../cx"
import { useSeedChecked } from "../react"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { useToggleGroupContext } from "../ToggleGroup/context.react"
import { isSelected } from "../ToggleGroup/selection"
import { warnGroupedChecked } from "../dev"
import type { Props } from "./types.react"

export default function ToggleButton({
  checked,
  className,
  defaultChecked,
  label,
  name,
  onChange,
  ref,
  size,
  style,
  type,
  value,
  children,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const group = useToggleGroupContext()
  const finalName = name || group?.groupName || field?.name
  const finalType =
    group?.inputType === "radio" ? "radio" : (type ?? "checkbox")
  const grouped = isSelected(group?.value, value)
  warnGroupedChecked(
    "ToggleButton",
    grouped,
    checked ?? defaultChecked,
    "ToggleGroup",
  )
  const inputRef = useSeedChecked(ref, (input) => group?.change?.(input))

  return (
    <label
      className={cx([
        "ui-toggle-button",
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      <input
        checked={grouped ?? checked}
        defaultChecked={grouped === undefined ? defaultChecked : undefined}
        name={finalName}
        type={finalType}
        value={value}
        {...rest}
        ref={inputRef}
        onChange={(event) => {
          group?.change?.(event.currentTarget)
          onChange?.(event)
        }}
      />{" "}
      {children === undefined ? label : children}
    </label>
  )
}
