import { filled } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Field({
  autoFit,
  className,
  dense,
  dropZone,
  hideLabel,
  htmlFor,
  size,
  spread,
  variant,
  children,
  bottom,
  end,
  endText,
  label,
  start,
  startText,
  top,
  ...rest
}: Props) {
  const hasLabel = Boolean(label)
  const hasStartText = Boolean(filled(startText))
  const hasEndText = Boolean(filled(endText))
  const startId = filled(start) ? `${htmlFor}-start` : undefined
  const endId = filled(end) ? `${htmlFor}-end` : undefined
  const topId = filled(top) ? `${htmlFor}-top` : undefined
  const bottomId = filled(bottom) ? `${htmlFor}-bottom` : undefined
  const startTextId = hasStartText ? `${htmlFor}-start-text` : undefined
  const endTextId = hasEndText ? `${htmlFor}-end-text` : undefined

  return (
    <div
      className={cx([
        "ui-field",
        {
          "ui-auto-fit": autoFit,
          "ui-dense": dense,
          "ui-drop-zone": dropZone,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
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
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field-container">
        {filled(top) && (
          <span className="ui-top" id={topId}>
            {top}
          </span>
        )}
        {filled(start) && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {children}
        {filled(end) && (
          <span className="ui-end" id={endId}>
            {end}
          </span>
        )}
        {filled(bottom) && (
          <span className="ui-bottom" id={bottomId}>
            {bottom}
          </span>
        )}
      </span>
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </div>
  )
}
