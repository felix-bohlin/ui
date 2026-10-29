"use client"

import { useEffect, useId } from "react"
import Button from "../Button/Button.react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { channelsFor, COLOR_SPACES } from "./channels"
import { copyPath, eyedropperPath } from "./icons"
import type { Props } from "./types.react"

export default function ColorField({
  autoFit,
  blacknessLabel,
  blueLabel,
  chromaLabel,
  className,
  colorSpaceLabel = "Color space",
  contrastLabel,
  copiedLabel,
  copyLabel = "Copy",
  error,
  eyedropperLabel = "Pick from the screen",
  greenLabel,
  hideLabel,
  hueLabel,
  id,
  invalidText,
  lightnessLabel,
  name,
  opacity,
  opacityLabel,
  p3Text,
  pickerLabel = "Pick a color",
  redLabel,
  saturationLabel,
  size,
  spread,
  srgbText,
  style,
  swatchOnly,
  variant,
  whitenessLabel,
  wideText,
  endText,
  label,
  startText,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const generatedId = useId()
  const inputId = id ?? generatedId

  useEffect(() => {
    void import("../../elements/color-field.js")
  }, [])

  return (
    <opui-color-field
      blackness-label={blacknessLabel}
      blue-label={blueLabel}
      chroma-label={chromaLabel}
      className={cx([
        "ui-color-field",
        { "ui-swatch-only": swatchOnly },
        className,
      ])}
      contrast-label={contrastLabel}
      copied-label={copiedLabel}
      green-label={greenLabel}
      hue-label={hueLabel}
      invalid-text={invalidText}
      lightness-label={lightnessLabel}
      p3-text={p3Text}
      red-label={redLabel}
      saturation-label={saturationLabel}
      srgb-text={srgbText}
      style={style}
      whiteness-label={whitenessLabel}
      wide-text={wideText}
    >
      {swatchOnly ? (
        <Button
          aria-describedby={rest["aria-describedby"]}
          aria-labelledby={`${inputId}-label`}
          command="toggle-popover"
          commandfor={`${inputId}-picker`}
          round
          size={size}
        >
          <span className="ui-indicator"></span>
        </Button>
      ) : (
        <div
          className={cx([
            "ui-text-field",
            {
              "ui-auto-fit": autoFit,
              "ui-filled": variant === "filled",
              "ui-spread": spread,
            },
            size && size !== "medium" && `ui-${size}`,
          ])}
        >
          {label && (
            <label
              className={hideLabel ? "ui-sr-only" : "ui-label"}
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
                <span className="ui-indicator"></span>
              </Button>
            </span>
            <input
              autoComplete="off"
              spellCheck="false"
              {...rest}
              aria-invalid={error ? "true" : rest["aria-invalid"]}
              id={inputId}
              name={name ?? field?.name}
              type="text"
            />
          </span>
          {endText && <span className="ui-end-text">{endText}</span>}
        </div>
      )}
      <div
        aria-labelledby={`${inputId}-label`}
        className="ui-floating"
        id={`${inputId}-picker`}
        popover="auto"
        role="dialog"
      >
        <div className="ui-header">
          <span aria-hidden="true" className="ui-value"></span>
          <span className="ui-actions">
            <Button
              aria-label={eyedropperLabel}
              command="--eyedropper"
              commandfor={inputId}
              hidden
              round
              size="small"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={eyedropperPath}></path>
              </svg>
            </Button>
            <Button
              aria-label={copyLabel}
              command="--copy"
              commandfor={inputId}
              round
              size="small"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={copyPath}></path>
              </svg>
            </Button>
          </span>
          <span className="ui-sr-only" role="status"></span>
        </div>
        {swatchOnly && (
          <div
            className={cx([
              "ui-text-field",
              {
                "ui-auto-fit": autoFit,
                "ui-filled": variant === "filled",
                "ui-spread": spread,
              },
              size && size !== "medium" && `ui-${size}`,
            ])}
          >
            {label && (
              <label
                className={hideLabel ? "ui-sr-only" : "ui-label"}
                htmlFor={inputId}
                id={`${inputId}-label`}
              >
                {label}
              </label>
            )}
            {startText && <span className="ui-start-text">{startText}</span>}
            <span className="ui-field">
              <input
                autoComplete="off"
                spellCheck="false"
                {...rest}
                aria-invalid={error ? "true" : rest["aria-invalid"]}
                id={inputId}
                name={name ?? field?.name}
                type="text"
              />
            </span>
            {endText && <span className="ui-end-text">{endText}</span>}
          </div>
        )}
        <div aria-hidden="true" className="ui-panel">
          <canvas></canvas>
        </div>
        <label className="ui-select ui-small ui-spread">
          <span className="ui-label" id={`${inputId}-space-label`}>
            {colorSpaceLabel}
          </span>
          <span className="ui-field">
            <select
              aria-describedby={`${inputId}-gamut`}
              aria-labelledby={`${inputId}-space-label`}
              defaultValue="oklch"
              id={`${inputId}-space`}
            >
              {COLOR_SPACES.map((space) => (
                <option key={space} value={space}>
                  {space}
                </option>
              ))}
            </select>
          </span>
        </label>
        {channelsFor(opacity, {
          chroma: chromaLabel,
          hue: hueLabel,
          lightness: lightnessLabel,
          opacity: opacityLabel,
        }).map((slider) => (
          <label htmlFor={`${inputId}-${slider.name}`} key={slider.name}>
            <span className="ui-label" id={`${inputId}-${slider.name}-label`}>
              {slider.label}
            </span>
            <output
              aria-live="off"
              className="ui-value"
              htmlFor={`${inputId}-${slider.name}`}
            />
            <input
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
        <p className="ui-description" id={`${inputId}-gamut`}></p>
        <p className="ui-footer">
          <span aria-hidden="true" data-contrast="light"></span>
          <span aria-hidden="true" data-contrast="dark"></span>
          <span className="ui-sr-only"></span>
        </p>
      </div>
    </opui-color-field>
  )
}
