import { useId } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function OneTimeCode({
  "aria-describedby": ariaDescribedBy,
  alphanumeric,
  autoCapitalize,
  autoComplete = "one-time-code",
  className,
  error,
  grouped,
  inputMode,
  length = 6,
  pattern,
  size,
  spellCheck,
  style,
  endText,
  label,
  ...rest
}: Props) {
  const uid = useId()
  const endTextId = endText ? `end-text-${uid}` : undefined
  const describedBy =
    [endTextId, ariaDescribedBy].filter(Boolean).join(" ") || undefined

  return (
    <label
      className={cx([
        "ui-text-field",
        "ui-one-time-code",
        {
          "ui-grouped": grouped,
        },
        size && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && <span className="ui-label">{label}</span>}
      <span className="ui-field">
        <input
          {...rest}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          autoCapitalize={
            autoCapitalize ?? (alphanumeric ? "characters" : undefined)
          }
          autoComplete={autoComplete}
          inputMode={inputMode ?? (alphanumeric ? undefined : "numeric")}
          maxLength={length}
          pattern={
            pattern ??
            (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
          }
          spellCheck={spellCheck ?? (alphanumeric ? "false" : undefined)}
          type="text"
        />
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
