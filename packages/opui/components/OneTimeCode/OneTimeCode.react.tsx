import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function OneTimeCode({
  alphanumeric,
  autoCapitalize,
  autoComplete = "one-time-code",
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
          {...rest}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          autoCapitalize={
            autoCapitalize ?? (alphanumeric ? "characters" : undefined)
          }
          autoComplete={autoComplete}
          inputMode={inputMode ?? (alphanumeric ? undefined : "numeric")}
          maxLength={length}
          name={name ?? field?.name}
          pattern={
            pattern ??
            (alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`)
          }
          spellCheck={spellCheck ?? (alphanumeric ? "false" : undefined)}
          type="text"
        />
      </span>
      {endText && <span className="ui-end-text">{endText}</span>}
    </label>
  )
}
