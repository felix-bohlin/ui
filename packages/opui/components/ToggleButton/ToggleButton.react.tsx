"use client"

import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { useToggleGroupContext } from "../ToggleGroup/context.react"
import { isSelected } from "../ToggleGroup/selection"
import type { Props } from "./types.react"

export default function ToggleButton({
  className,
  disabled,
  label,
  name,
  onChange,
  pressed,
  size,
  type,
  value,
  children,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const group = useToggleGroupContext()

  const finalName = name || group?.groupName || field?.name
  const finalType =
    group?.inputType === "radio"
      ? "radio"
      : type || group?.inputType || "checkbox"
  const checked = isSelected(group?.value, value || label)

  return (
    <label
      className={cx(["ui-toggle-button", size && `ui-${size}`, className])}
    >
      <input
        checked={checked}
        defaultChecked={checked === undefined ? pressed : undefined}
        disabled={disabled}
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
