"use client"

import { useId } from "react"
import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import type { ClassicSelectProps as Props } from "./types.react"

export default function ClassicSelect({
  className,
  endText,
  error,
  id,
  items = [],
  label,
  name,
  size,
  variant = "outlined",
  children,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldContext()
  const selectId = id || `select-${uid}`
  const endTextId = endText ? `end-text-${uid}` : undefined

  return (
    <label
      className={cx([
        "ui-select",
        size && `ui-${size}`,
        {
          "ui-filled": variant === "filled",
        },
        className,
      ])}
    >
      {label && <span className="ui-label">{label}</span>}
      <span className="ui-field">
        <select
          aria-describedby={endTextId}
          aria-invalid={error ? "true" : undefined}
          id={selectId}
          name={name ?? field?.name}
          {...rest}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
          {children}
        </select>
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
