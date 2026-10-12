"use client"

import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import { useToggleGroupContext } from "../ToggleGroup/context.react"
import type { Props } from "./types.react"

export default function ToggleButton({
  className,
  disabled,
  label,
  name,
  pressed,
  size,
  type,
  value,
  children,
  ...rest
}: Props) {
  const field = useFieldContext()
  const group = useToggleGroupContext()

  const finalName = name || group?.groupName || field?.name
  const finalType =
    group?.inputType === "radio"
      ? "radio"
      : type || group?.inputType || "checkbox"

  return (
    <label
      className={cx(["ui-toggle-button", size && `ui-${size}`, className])}
    >
      <input
        defaultChecked={pressed}
        disabled={disabled}
        name={finalName}
        type={finalType}
        value={value || label}
        {...rest}
      />
      {children ?? label}
    </label>
  )
}
