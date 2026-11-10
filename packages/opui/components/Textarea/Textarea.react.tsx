"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { Props } from "./types.react"

export default function Textarea({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
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
  const Root = label ? "label" : "div"
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const linked = !label
  const startTextId = linked && hasStartText ? `${base}-start-text` : undefined
  const endTextId = linked && hasEndText ? `${base}-end-text` : undefined
  useEffect(() => {
    void import("../../elements/character-count.js")
  }, [])

  return (
    <Root
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
      {label && (
        <span className={hideLabel ? "ui-sr-only" : "ui-label"}>{label}</span>
      )}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        <textarea
          {...rest}
          aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
          aria-invalid={error ? "true" : ariaInvalid}
          id={id}
          name={name ?? field?.name}
        />
        {start && <span className="ui-start">{start}</span>}
        {end && <span className="ui-end">{end}</span>}
        {top && <span className="ui-top">{top}</span>}
        {bottom && <span className="ui-bottom">{bottom}</span>}
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
    </Root>
  )
}
