"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { Props } from "./types.react"

export default function Textarea({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  autoFit,
  characterCount,
  characterCountLabel,
  className,
  error,
  hideLabel,
  id,
  name,
  size,
  spread,
  style,
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
  const field = useFieldGroupContext()
  const uid = useId()
  const base = id || `textarea-${uid}`
  const named = Boolean(label)
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const textareaId = named ? base : id
  const startId = start ? `${base}-start` : undefined
  const endId = end ? `${base}-end` : undefined
  const topId = top ? `${base}-top` : undefined
  const bottomId = bottom ? `${base}-bottom` : undefined
  const startTextId = hasStartText ? `${base}-start-text` : undefined
  const endTextId = hasEndText ? `${base}-end-text` : undefined
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
      style={style}
    >
      {named && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={textareaId}
        >
          {label}
        </label>
      )}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        <textarea
          {...rest}
          aria-describedby={idRefs(
            startTextId,
            topId,
            startId,
            endId,
            bottomId,
            endTextId,
            ariaDescribedBy,
          )}
          aria-invalid={error ? "true" : ariaInvalid}
          aria-labelledby={ariaLabelledBy}
          id={textareaId}
          name={name ?? field?.name}
        />
        {start && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {end && (
          <span className="ui-end" id={endId}>
            {end}
          </span>
        )}
        {top && (
          <span className="ui-top" id={topId}>
            {top}
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
      {children}
    </div>
  )
}
