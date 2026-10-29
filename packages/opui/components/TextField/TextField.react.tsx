"use client"

import { useEffect, useId } from "react"
import Button from "../Button/Button.react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import { hidePath, showPath } from "./icons"
import type { Props } from "./types.react"

export default function TextField({
  autoFit,
  characterCount,
  characterCountLabel,
  className,
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
  label,
  start,
  startText,
  top,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const generatedId = useId()
  const Root = passwordToggle ? "opui-text-field" : "label"
  const Label = passwordToggle ? "label" : "span"
  const hasEndText = Boolean(endText || characterCount)
  const inputId = passwordToggle ? (id ?? `${generatedId}text-field`) : id
  const startTextId =
    passwordToggle && startText ? `${generatedId}start-text` : undefined
  const endTextId =
    passwordToggle && hasEndText ? `${generatedId}end-text` : undefined

  useEffect(() => {
    if (characterCount) void import("../../elements/character-count.js")
    if (passwordToggle) void import("../../elements/text-field.js")
  }, [characterCount, passwordToggle])

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
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={passwordToggle ? inputId : undefined}
        >
          {label}
        </Label>
      )}
      {startText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        <input
          {...rest}
          aria-describedby={idRefs(
            startTextId,
            endTextId,
            rest["aria-describedby"],
          )}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          id={inputId}
          inputMode={
            rest.inputMode ?? (type === "numeric" ? "numeric" : undefined)
          }
          name={name ?? field?.name}
          pattern={rest.pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
          type={type === "numeric" ? "text" : type}
        />
        {start && <span className="ui-start">{start}</span>}
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
        )}
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
            />
          )}
        </span>
      )}
      {children}
    </Root>
  )
}
