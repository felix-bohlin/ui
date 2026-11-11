"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import { minusPath, plusPath } from "./icons"
import type { Props } from "./types.react"

export default function NumberField({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  className,
  decreaseLabel = "Decrease",
  disabled,
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
  decreaseIcon,
  endText,
  increaseIcon,
  label,
  startText,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const uid = useId()
  const base = id || `number-field-${uid}`
  const inputId = base
  const startTextId = startText ? `${base}-start-text` : undefined
  const endTextId = endText ? `${base}-end-text` : undefined
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
            aria-controls={inputId}
            aria-label={decreaseLabel}
            command="--step-down"
            commandfor={inputId}
            disabled={disabled}
            round
          >
            {decreaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={minusPath} />
              </svg>
            ) : (
              decreaseIcon
            )}
          </Button>
        </span>
        <input
          {...rest}
          aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
          aria-invalid={error ? "true" : ariaInvalid}
          disabled={disabled}
          id={inputId}
          name={name ?? field?.name}
          type="number"
        />
        <span className="ui-end">
          <Button
            aria-controls={inputId}
            aria-label={increaseLabel}
            command="--step-up"
            commandfor={inputId}
            disabled={disabled}
            round
          >
            {increaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={plusPath} />
              </svg>
            ) : (
              increaseIcon
            )}
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
