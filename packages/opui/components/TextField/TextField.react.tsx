"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { Props } from "./types.react"

export default function TextField({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  autoFit,
  characterCount,
  characterCountLabel,
  className,
  disabled,
  dropZone,
  error,
  hideLabel,
  id,
  name,
  passwordToggle,
  passwordToggleLabel = "Show password",
  size,
  spread,
  style,
  type = "text",
  variant,
  children,
  bottom,
  end,
  endText,
  iconChecked,
  iconUnchecked,
  label,
  start,
  startText,
  top,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const uid = useId()
  const base = id || `text-field-${uid}`
  const hasLabel = Boolean(label)
  const Root = passwordToggle ? "opui-text-field" : hasLabel ? "label" : "div"
  const Label = passwordToggle ? "label" : "span"
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const inputId = passwordToggle ? base : id
  const named = hasLabel && !passwordToggle
  const labelId = named ? `${base}-label` : undefined
  const startId = named && start ? `${base}-start` : undefined
  const endId = named && end ? `${base}-end` : undefined
  const topId = top ? `${base}-top` : undefined
  const bottomId = bottom ? `${base}-bottom` : undefined
  const startTextId = hasStartText ? `${base}-start-text` : undefined
  const endTextId = hasEndText ? `${base}-end-text` : undefined
  useEffect(() => {
    void import("../../elements/character-count.js")
    void import("../../elements/text-field.js")
  }, [])

  return (
    <Root
      className={cx([
        "ui-text-field",
        {
          "ui-auto-fit": autoFit,
          "ui-drop-zone": dropZone,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {hasLabel && (
        <Label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={passwordToggle ? inputId : undefined}
          id={labelId}
        >
          {label}
        </Label>
      )}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        <input
          {...rest}
          aria-describedby={idRefs(
            startTextId,
            topId,
            bottomId,
            endTextId,
            ariaDescribedBy,
          )}
          aria-invalid={error ? "true" : ariaInvalid}
          aria-labelledby={
            named ? idRefs(labelId, startId, endId) : ariaLabelledBy
          }
          disabled={disabled}
          id={inputId}
          name={name ?? field?.name}
          type={type}
        />
        {start && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {(end || passwordToggle) && (
          <span className="ui-end" id={endId}>
            {end}
            {passwordToggle && (
              <Button
                aria-label={passwordToggleLabel}
                aria-pressed="false"
                command="--toggle-password"
                commandfor={inputId}
                disabled={disabled}
                round
              >
                {iconUnchecked ? (
                  <span aria-hidden="true" className="ui-icon-unchecked">
                    {iconUnchecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="ui-icon-unchecked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
                {iconChecked ? (
                  <span aria-hidden="true" className="ui-icon-checked">
                    {iconChecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="ui-icon-checked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
              </Button>
            )}
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
    </Root>
  )
}
