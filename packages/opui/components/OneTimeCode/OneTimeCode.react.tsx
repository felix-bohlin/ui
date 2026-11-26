import { filled } from "../attrs"
import { cx } from "../cx"
import { DEV, warnControlAttributes } from "../dev"
import type { Props } from "./types.react"

export default function OneTimeCode({
  className,
  grouped,
  hideLabel,
  htmlFor,
  size,
  children,
  endText,
  label,
  ...rest
}: Props) {
  const hasLabel = Boolean(label)
  const hasEndText = Boolean(filled(endText))
  const endTextId = hasEndText ? `${htmlFor}-end-text` : undefined
  if (DEV) warnControlAttributes("OneTimeCode", rest)

  return (
    <div
      className={cx([
        "ui-one-time-code",
        { "ui-grouped": grouped },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      {hasLabel && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      <span className="ui-field-container">{children}</span>
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </div>
  )
}
