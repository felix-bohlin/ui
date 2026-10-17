"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { RangeProps as Props } from "./types.react"

export default function Range({
  className,
  defaultValue,
  endText,
  error,
  id,
  label,
  list,
  max,
  min,
  name,
  onChange,
  options,
  spread,
  startText,
  step,
  style,
  value,
  valueSuffix,
  variant,
  children,
  datalist,
  valueText,
  ref,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldContext()
  const [current, setCurrent] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const sync = () => setTimeout(() => setCurrent(inputRef.current?.value))
    form.addEventListener("reset", sync)
    return () => form.removeEventListener("reset", sync)
  }, [])

  const setRef = useCallback(
    (input: HTMLInputElement | null) => {
      inputRef.current = input
      if (typeof ref === "function") return ref(input)
      if (ref) ref.current = input
    },
    [ref],
  )

  const hasLabel = !!label || !!children
  const hasValue = valueSuffix !== undefined || !!valueText
  const hasDatalist = !!options || !!datalist
  const middle = () => {
    const minValue = Number(min ?? 0)
    const maxValue = Math.max(minValue, Number(max ?? 100))
    const stepValue = step === "any" ? 0 : Number(step ?? 1)
    const center = minValue + (maxValue - minValue) / 2
    if (!stepValue) return center
    const stepped =
      minValue + Math.round((center - minValue) / stepValue) * stepValue
    return stepped > maxValue ? stepped - stepValue : stepped
  }

  const inputId = id || (hasValue ? `range-${uid}` : undefined)
  const labelId = hasLabel ? `range-label-${uid}` : undefined
  const startTextId = startText ? `range-start-${uid}` : undefined
  const endTextId = endText ? `range-end-${uid}` : undefined
  const listId = list ?? (hasDatalist ? `range-list-${uid}` : undefined)
  const describedBy = idRefs(startTextId, endTextId, rest["aria-describedby"])

  return (
    <label
      className={cx([
        "ui-range",
        variant && `ui-${variant}`,
        { "ui-spread": spread },
        className,
      ])}
      style={style}
    >
      {hasLabel && (
        <span className="ui-label" id={labelId}>
          {label}
          {children}
        </span>
      )}
      {hasValue && (
        <output
          className="ui-value"
          data-suffix={valueSuffix}
          htmlFor={inputId}
        >
          {valueText
            ? valueText(Number(value ?? current ?? middle()))
            : `${value ?? current ?? middle()}${valueSuffix ?? ""}`}
        </output>
      )}
      {startText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
        </span>
      )}
      <input
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
        aria-labelledby={labelId ?? rest["aria-labelledby"]}
        defaultValue={defaultValue}
        id={inputId}
        list={listId}
        max={max}
        min={min}
        name={name ?? field?.name}
        onChange={(event) => {
          setCurrent(event.target.value)
          onChange?.(event)
        }}
        ref={setRef}
        step={step}
        type="range"
        value={value}
      />
      {hasDatalist && (
        <datalist id={listId}>
          {options?.map((option) =>
            typeof option === "object" ? (
              <option
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ) : (
              <option key={option} value={option} />
            ),
          )}
          {datalist}
        </datalist>
      )}
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
