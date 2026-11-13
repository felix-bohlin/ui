"use client"

import { defined } from "../attrs"
import { cx } from "../cx"
import { mergeStyle } from "../style"
import type { Props } from "./types.react"

export default function Rating({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  clearLabel = "No rating",
  defaultValue,
  disabled,
  error,
  label,
  max = 5,
  name,
  onValueChange,
  required,
  size,
  starLabel = (value: number) => (value === 1 ? "1 star" : `${value} stars`),
  style,
  value,
  ...rest
}: Props) {
  const count = Number(max)
  const stars = Array.from({ length: count }, (_, index) => index + 1)
  const current = Number(value ?? defaultValue)
  const invalid = error ? "true" : ariaInvalid

  return name ? (
    <fieldset
      className={cx([
        "ui-rating",
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      disabled={disabled}
      style={style}
      {...rest}
    >
      <legend>{label}</legend>
      {!required && (
        <input
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid}
          aria-label={clearLabel}
          checked={value !== undefined ? current === 0 : undefined}
          defaultChecked={value !== undefined ? undefined : current === 0}
          onChange={() => onValueChange?.(0)}
          name={name}
          type="radio"
          value={0}
        />
      )}
      {stars.map((star, index) => (
        <input
          key={index}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid}
          aria-label={starLabel(star)}
          checked={value !== undefined ? current === star : undefined}
          defaultChecked={value !== undefined ? undefined : current === star}
          onChange={() => onValueChange?.(star)}
          name={name}
          required={required}
          type="radio"
          value={star}
        />
      ))}
    </fieldset>
  ) : (
    <meter
      aria-describedby={ariaDescribedBy}
      aria-label={label}
      className={cx([
        "ui-rating",
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      max={max}
      style={mergeStyle(
        { "--_max": count === 5 ? undefined : count },
        style ?? {},
      )}
      value={value ?? defaultValue ?? 0}
      {...defined(rest)}
    />
  )
}
