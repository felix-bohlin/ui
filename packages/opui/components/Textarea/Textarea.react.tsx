"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Textarea({
  autoFit,
  characterCount,
  characterCountLabel,
  className,
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
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const startId = start ? `${htmlFor}-start` : undefined
  const endId = end ? `${htmlFor}-end` : undefined
  const topId = top ? `${htmlFor}-top` : undefined
  const bottomId = bottom ? `${htmlFor}-bottom` : undefined
  const startTextId = hasStartText ? `${htmlFor}-start-text` : undefined
  const endTextId = hasEndText ? `${htmlFor}-end-text` : undefined
  useEffect(() => {
    void import("../../elements/character-count.js")
  }, [])

  return (
    <div
      className={cx([
        "ui-textarea",
        {
          "ui-auto-fit": autoFit,
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
        {top && (
          <span className="ui-top" id={topId}>
            {top}
          </span>
        )}
        {start && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {children}
        {end && (
          <span className="ui-end" id={endId}>
            {end}
          </span>
        )}
        {bottom && (
          <span className="ui-bottom" id={bottomId}>
            {bottom}
          </span>
        )}
      </span>
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
          {characterCount && (
            <opui-character-count
              aria-hidden="true"
              className="ui-value"
              label={characterCountLabel}
              dangerouslySetInnerHTML={{ __html: "" }}
              suppressHydrationWarning
            />
          )}
        </span>
      )}
    </div>
  )
}
