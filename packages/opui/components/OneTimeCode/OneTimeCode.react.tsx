"use client"

import { useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { Props } from "./types.react"

export default function OneTimeCode({
  alphanumeric,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  autoCapitalize,
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
  const named = Boolean(label)
  const base = id || `one-time-code-${uid}`
  const inputId = named ? base : id
  const hasEndText = Boolean(endText)
  const endTextId = hasEndText ? `${base}-end-text` : undefined

  return (
    <div
      className={cx([
        "ui-text-field",
        "ui-one-time-code",
        { "ui-grouped": grouped },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {named && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      )}
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
          aria-describedby={idRefs(endTextId, ariaDescribedBy)}
          aria-invalid={error ? "true" : ariaInvalid}
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
