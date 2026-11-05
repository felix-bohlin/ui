"use client"

import { useEffect, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { createIds, idRefs } from "../id"
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
  const ids = createIds(uid, "range", id || undefined)
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
  const inputId = id || (hasValue ? ids() : undefined)
  const labelId = hasLabel ? ids("label") : undefined
  const startTextId = hasStartText ? ids("start-text") : undefined
  const endTextId = hasEndText ? ids("end-text") : undefined
  const listId = list ?? (hasDatalist ? ids("list") : undefined)
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
