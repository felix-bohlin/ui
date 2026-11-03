"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { createIds } from "../id"
import { channelsFor } from "./channels"
import type { Props } from "./types.react"

export default function ColorField({
  alpha,
  "aria-invalid": ariaInvalid,
  className,
  error,
  hideLabel,
  id,
  name,
  pickerLabel = "Pick a color",
  size,
  spread,
  style,
  variant,
  endText,
  label,
  startText,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const uid = useId()
  const inputId = createIds(uid, "color-field", id)()
  useEffect(() => {
    void import("../../elements/color-field.js")
  }, [])

  return (
    <opui-color-field
      className={cx(["ui-color-field", className])}
      style={style}
    >
      <div
        className={cx([
          "ui-text-field",
          { "ui-filled": variant === "filled", "ui-spread": spread },
          size && size !== "medium" && `ui-${size}`,
        ])}
      >
        {label && (
          <label
            className={cx([hideLabel ? "ui-sr-only" : "ui-label"])}
            htmlFor={inputId}
            id={`${inputId}-label`}
          >
            {label}
          </label>
        )}
        {startText && <span className="ui-start-text">{startText}</span>}
        <span className="ui-field">
          <span className="ui-start">
            <Button
              aria-label={pickerLabel}
              command="toggle-popover"
              commandfor={`${inputId}-picker`}
              round
            >
              <span className="ui-indicator" />
            </Button>
          </span>{" "}
          <input
            autoComplete="off"
            spellCheck="false"
            {...rest}
            aria-invalid={error ? "true" : ariaInvalid}
            id={inputId}
            name={name ?? field?.name}
            type="text"
          />
        </span>
        {endText && <span className="ui-end-text">{endText}</span>}
      </div>
      <div
        aria-labelledby={`${inputId}-label`}
        className="ui-floating"
        id={`${inputId}-picker`}
        popover="auto"
        role="dialog"
      >
        {channelsFor(alpha).map((slider, index) => (
          <label
            key={index}
            className="ui-range"
            htmlFor={`${inputId}-${slider.name}`}
          >
            <span className="ui-label" id={`${inputId}-${slider.name}-label`}>
              {slider.label}
            </span>
            <output
              aria-live="off"
              className="ui-value"
              htmlFor={`${inputId}-${slider.name}`}
            />
            <input
              aria-describedby={
                slider.channel === "C" ? `${inputId}-gamut` : undefined
              }
              aria-labelledby={`${inputId}-${slider.name}-label`}
              data-channel={slider.channel}
              id={`${inputId}-${slider.name}`}
              max={slider.max}
              min="0"
              step={slider.step}
              type="range"
            />
          </label>
        ))}
        <p className="ui-description" id={`${inputId}-gamut`} />
      </div>
    </opui-color-field>
  )
}
