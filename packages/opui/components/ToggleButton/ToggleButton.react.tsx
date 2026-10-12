"use client"

import { useId } from "react"
import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import { useToggleGroupContext } from "../ToggleGroup/context.react"
import type { Props } from "./types.react"

export default function ToggleButton({
  className,
  disabled,
  id,
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
  const uid = useId()

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
        id={id || `toggle-${uid}`}
        name={finalName}
        type={finalType}
        value={value || label}
        {...rest}
      />
      {children ?? label}
    </label>
  )
}
