"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import type { Props } from "./types.react"
import { defaultValue, resetValue } from "./value"

export default function Range({
  className,
  defaultValue: defaultValueProp,
  endText,
  error,
  hideLabel,
  id,
  items,
  list,
  max,
  min,
  name,
  onChange,
  ref,
  size,
  spread,
  startText,
  step,
  style,
  value,
  valueSuffix,
  variant,
  datalist,
  label,
  valueText,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldGroupContext()
  const [current, setCurrent] = useState(defaultValueProp)
  // Firefox and Safari replace an output's children on form reset, which
  // detaches the nodes React updates, so each reset renders a new output
  const [resets, setResets] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const sync = (event: Event) =>
      setTimeout(() => {
        if (!inputRef.current || event.defaultPrevented) return
        setCurrent(resetValue(inputRef.current))
        setResets((count) => count + 1)
      })
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

  const hasLabel = !!label
  const hasValue = valueSuffix !== undefined || !!valueText
  const hasDatalist = !!items || !!datalist
  const middle = () => defaultValue({ max, min, step })
  const shown = value ?? current ?? middle()

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
        { "ui-spread": spread },
        size && size !== "medium" && `ui-${size}`,
        variant && variant !== "outlined" && `ui-${variant}`,
        className,
      ])}
      htmlFor={hasValue ? inputId : undefined}
      style={style}
    >
      {hasLabel && (
        <span className={hideLabel ? "ui-sr-only" : "ui-label"} id={labelId}>
          {label}
        </span>
      )}
      {hasValue && (
        <output
          key={resets}
          aria-live="off"
          className="ui-value"
          data-suffix={valueSuffix}
          htmlFor={inputId}
        >
          {valueText
            ? valueText(Number(shown))
            : `${shown}${valueSuffix ?? ""}`}
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
        aria-valuetext={
          rest["aria-valuetext"] ??
          (valueSuffix && !valueText ? `${shown}${valueSuffix}` : undefined)
        }
        defaultValue={defaultValueProp}
        id={inputId}
        list={listId}
        max={max}
        min={min}
        name={name ?? field?.name}
        onChange={(event) => {
          setCurrent(event.target.valueAsNumber)
          onChange?.(event)
        }}
        ref={setRef}
        step={step}
        type="range"
        value={value}
      />
      {hasDatalist && (
        <datalist aria-hidden="true" id={listId}>
          {items?.map((option) =>
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
