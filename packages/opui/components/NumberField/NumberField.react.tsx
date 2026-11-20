"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function NumberField({
  className,
  decreaseLabel = "Decrease",
  hideLabel,
  htmlFor,
  increaseLabel = "Increase",
  size,
  spread,
  stretch,
  variant,
  children,
  decreaseIcon,
  endText,
  increaseIcon,
  label,
  startText,
  ...rest
}: Props) {
  const startTextId = startText ? `${htmlFor}-start-text` : undefined
  const endTextId = endText ? `${htmlFor}-end-text` : undefined
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
      {...rest}
    >
      {label && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={htmlFor}
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
          <button
            className="ui-button ui-round"
            type="button"
            aria-controls={htmlFor}
            aria-label={decreaseLabel}
            command="--step-down"
            commandfor={htmlFor}
          >
            {decreaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              />
            ) : (
              decreaseIcon
            )}
          </button>
        </span>
        {children}
        <span className="ui-end">
          <button
            className="ui-button ui-round"
            type="button"
            aria-controls={htmlFor}
            aria-label={increaseLabel}
            command="--step-up"
            commandfor={htmlFor}
          >
            {increaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              />
            ) : (
              increaseIcon
            )}
          </button>
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
