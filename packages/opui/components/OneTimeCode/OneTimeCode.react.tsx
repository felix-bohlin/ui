import { filled } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function OneTimeCode({
  className,
  grouped,
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
        <label className="ui-label" htmlFor={htmlFor}>
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
