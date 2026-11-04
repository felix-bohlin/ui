"use client"

import { type ElementType, useEffect, useId } from "react"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { createIds, idRefs } from "../id"
import { hidePath, showPath } from "./icons"
import type { Props } from "./types.react"

export default function TextField({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  autoFit,
  characterCount,
  characterCountLabel,
  className,
  error,
  hideLabel,
  id,
  inputMode: inputmode,
  name,
  passwordToggle,
  passwordToggleLabel = "Show password",
  pattern,
  size,
  spread,
  style,
  type = "text",
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
  const ids = createIds(uid, "text-field", id)
  const root = passwordToggle ? "opui-text-field" : "label"
  const Root: ElementType = root
  const labelTag = passwordToggle ? "label" : "span"
  const Label: ElementType = labelTag
  const hasStartText = Boolean(startText)
  const hasEndText = Boolean(endText || characterCount)
  const inputId = passwordToggle ? ids() : id
  const startTextId =
    passwordToggle && hasStartText ? ids("start-text") : undefined
  const endTextId = passwordToggle && hasEndText ? ids("end-text") : undefined
  useEffect(() => {
    void import("../../elements/character-count.js")
  }, [])
  useEffect(() => {
    void import("../../elements/text-field.js")
  }, [])

  return (
    <Root
      className={cx([
        "ui-text-field",
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
        <Label
          className={cx([hideLabel ? "ui-sr-only" : "ui-label"])}
          htmlFor={passwordToggle ? inputId : undefined}
        >
          {label}
        </Label>
      )}{" "}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}{" "}
      <span className="ui-field">
        <input
          {...rest}
          aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
          aria-invalid={error ? "true" : ariaInvalid}
          id={inputId}
          inputMode={inputmode ?? (type === "numeric" ? "numeric" : undefined)}
          name={name ?? field?.name}
          pattern={pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
          type={type === "numeric" ? "text" : type}
        />{" "}
        {start && <span className="ui-start">{start}</span>}{" "}
        {(end || passwordToggle) && (
          <span className="ui-end">
            {end}
            {passwordToggle && (
              <Button
                aria-label={passwordToggleLabel}
                aria-pressed="false"
                command="--toggle-password"
                commandfor={inputId}
                round
              >
                <svg
                  aria-hidden="true"
                  className="ui-icon-unchecked"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d={showPath} />
                </svg>
                <svg
                  aria-hidden="true"
                  className="ui-icon-checked"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d={hidePath} />
                </svg>
              </Button>
            )}
          </span>
        )}{" "}
        {top && <span className="ui-top">{top}</span>}{" "}
        {bottom && <span className="ui-bottom">{bottom}</span>}
      </span>{" "}
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
          {characterCount && (
            <opui-character-count
              aria-hidden="true"
              className="ui-value"
              label={characterCountLabel}
            />
          )}
        </span>
      )}{" "}
      {children}
    </Root>
  )
}
