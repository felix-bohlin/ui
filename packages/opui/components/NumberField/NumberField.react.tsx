"use client"

import { useEffect, useId } from "react"
import Button from "../Button/Button.react"
import { cx } from "../cx"
import { idRefs } from "../id"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { minusPath, plusPath } from "./icons"
import type { Props } from "./types.react"

export default function NumberField({
  className,
  decreaseLabel = "Decrease",
  error,
  hideLabel,
  id,
  increaseLabel = "Increase",
  name,
  size,
  spread,
  stretch,
  style,
  variant,
  endText,
  label,
  startText,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const generatedId = useId()
  const inputId = id ?? generatedId
  const startTextId = startText ? `${generatedId}start-text` : undefined
  const endTextId = endText ? `${generatedId}end-text` : undefined

  useEffect(() => {
    void import("../../elements/number-field.js")
  }, [])

  return (
    <opui-number-field
      className={cx([
        "ui-number-field",
        {
          "ui-filled": variant === "filled",
          "ui-spread": spread,
          "ui-stretch": stretch,
        },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {startText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <span className="ui-field">
        <span className="ui-start">
          <Button
            aria-label={decreaseLabel}
            command="--step-down"
            commandfor={inputId}
            round
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d={minusPath}></path>
            </svg>
          </Button>
        </span>
        <input
          {...rest}
          aria-describedby={idRefs(
            startTextId,
            endTextId,
            rest["aria-describedby"],
          )}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          id={inputId}
          name={name ?? field?.name}
          type="number"
        />
        <span className="ui-end">
          <Button
            aria-label={increaseLabel}
            command="--step-up"
            commandfor={inputId}
            round
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d={plusPath}></path>
            </svg>
          </Button>
        </span>
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </opui-number-field>
  )
}
