"use client"

import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { useToggleGroupContext } from "../ToggleGroup/context.react"
import { isSelected } from "../ToggleGroup/selection"
import type { Props } from "./types.react"

export default function ToggleButton({
  className,
  label,
  name,
  onChange,
  pressed,
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
  const checked = isSelected(group?.value, value || label)

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
        checked={checked}
        defaultChecked={checked === undefined ? pressed : undefined}
        name={finalName}
        type={finalType}
        value={value || label}
        {...rest}
        onChange={(event) => {
          group?.change(event.currentTarget)
          onChange?.(event)
        }}
      />
      {children ?? label}
    </label>
  )
}
