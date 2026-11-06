"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import { defaultValue } from "./value"
import type { Props } from "./types.react"

export default function Range({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  "aria-valuetext": ariaValueText,
  className,
  error,
  hideLabel,
  id,
  items,
  list,
  max,
  min,
  name,
  size,
  spread,
  step,
  style,
  valueSuffix,
  variant,
  datalist,
  endText,
  label,
  startText,
  valueText,
  ...rest
}: Props) {
  const field = useFieldGroupContext()
  const uid = useId()
  const base = id || `range-${uid}`
  const hasLabel = !!label || label
  const hasStartText = !!startText || startText
  const hasEndText = !!endText || endText
  const hasValueText = valueText
  const hasValue = valueSuffix !== undefined || hasValueText
  const hasDatalist = !!items || datalist
  const current =
    rest.value ?? rest.defaultValue ?? defaultValue({ max, min, step })
  const readout = `${current}${valueSuffix ?? ""}`
  const tick = items?.find(
    (option) =>
      typeof option === "object" && Number(option.value) === Number(current),
  )
  const tickLabel =
    valueSuffix || typeof tick !== "object" ? undefined : tick.label
  const inputId = id || (hasValue ? base : undefined)
  const labelId = hasLabel ? `${base}-label` : undefined
  const startTextId = hasStartText ? `${base}-start-text` : undefined
  const endTextId = hasEndText ? `${base}-end-text` : undefined
  const listId = list ?? (hasDatalist ? `${base}-list` : undefined)
  const describedBy = idRefs(startTextId, endTextId, ariaDescribedBy)
  useEffect(() => {
    void import("../../css/js/range.js")
  }, [])

  return (
    <label
      className={cx([
        "ui-range",
        { "ui-spread": spread },
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "outlined" && `ui-${variant}`,
        className,
      ])}
      htmlFor={hasValue ? inputId : undefined}
      style={style}
    >
      {hasLabel && (
        <span
          className={cx([hideLabel ? "ui-sr-only" : "ui-label"])}
          id={labelId}
        >
          {label}
        </span>
      )}{" "}
      {hasValue && (
        <output
          aria-live="off"
          className="ui-value"
          data-live={hasValueText ? undefined : ""}
          htmlFor={inputId}
          data-suffix={valueSuffix}
        >
          {valueText === undefined ? readout : valueText}
        </output>
      )}{" "}
      {hasStartText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}{" "}
      <input
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : ariaInvalid}
        aria-labelledby={labelId ?? ariaLabelledBy}
        aria-valuetext={
          ariaValueText ?? (valueSuffix && !hasValueText ? readout : tickLabel)
        }
        id={inputId}
        list={listId}
        max={max}
        min={min}
        name={name ?? field?.name}
        step={step}
        type="range"
      />{" "}
      {hasDatalist && (
        <datalist aria-hidden="true" id={listId}>
          {items?.map((option, index) =>
            typeof option === "object" ? (
              <option key={index} value={option.value} label={option.label} />
            ) : (
              <option key={index} value={option} />
            ),
          )}
          {datalist}
        </datalist>
      )}{" "}
      {hasEndText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
