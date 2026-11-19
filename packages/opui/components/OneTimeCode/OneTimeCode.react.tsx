"use client"

import { useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { fieldDescribedBy } from "../id"
import type { Props } from "./types.react"

export default function OneTimeCode({
  alphanumeric,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  autoCapitalize,
  autoComplete,
  className,
  error,
  grouped,
  id,
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
  const uid = useId()
  const hasLabel = Boolean(label)
  const hasEndText = Boolean(endText)
  const base = id || `one-time-code-${uid}`
  const inputId = hasLabel ? base : id
  const endTextId = hasEndText ? `${base}-end-text` : undefined

  return (
    <div
      className={cx([
        "ui-one-time-code",
        { "ui-grouped": grouped },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {hasLabel && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <span className="ui-field">
        <input
          autoCapitalize={
            autoCapitalize ?? (alphanumeric ? "characters" : undefined)
          }
          autoComplete={autoComplete ?? "one-time-code"}
          inputMode={inputMode ?? (alphanumeric ? undefined : "numeric")}
          pattern={
            pattern ??
            (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
          }
          spellCheck={spellCheck ?? (alphanumeric ? "false" : undefined)}
          {...rest}
          aria-describedby={fieldDescribedBy(
            { endText: endTextId },
            ariaDescribedBy,
          )}
          aria-invalid={error ? "true" : ariaInvalid}
          aria-labelledby={ariaLabelledBy}
          id={inputId}
          maxLength={length}
          name={name ?? field?.name}
          type="text"
        />
      </span>
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </div>
  )
}
