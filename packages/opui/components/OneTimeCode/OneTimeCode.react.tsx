"use client"

import { defined } from "../attrs"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function OneTimeCode({
  alphanumeric,
  "aria-invalid": ariaInvalid,
  autoCapitalize,
  className,
  error,
  grouped,
  inputMode,
  length = 6,
  name,
  pattern,
  size,
  spellCheck,
  style,
  endText,
  label,
  ...rest
}: Props) {
  const field = useFieldGroupContext()

  return (
    <label
      className={cx([
        "ui-text-field",
        "ui-one-time-code",
        { "ui-grouped": grouped },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && <span className="ui-label">{label}</span>}
      <span className="ui-field">
        <input
          autoCapitalize={
            autoCapitalize ?? (alphanumeric ? "characters" : undefined)
          }
          autoComplete="one-time-code"
          inputMode={inputMode ?? (alphanumeric ? undefined : "numeric")}
          pattern={
            pattern ??
            (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
          }
          spellCheck={spellCheck ?? (alphanumeric ? "false" : undefined)}
          {...defined(rest)}
          aria-invalid={error ? "true" : ariaInvalid}
          maxLength={length}
          name={name ?? field?.name}
          type="text"
        />
      </span>
      {endText && <span className="ui-end-text">{endText}</span>}
    </label>
  )
}
