"use client"

import { createElement, useId } from "react"
import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function Select({
  className,
  defaultValue,
  dense,
  error,
  id,
  items = [],
  multiple,
  name,
  size,
  spread,
  value,
  variant = "outlined",
  children,
  description,
  endText,
  footer,
  header,
  label,
  prefix,
  suffix,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldContext()
  const labelId = `select-label-${uid}`
  const descriptionId = description ? `start-text-${uid}` : undefined
  const endTextId = endText ? `end-text-${uid}` : undefined
  const describedBy =
    [descriptionId, endTextId, rest["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined

  const selectedValues = items
    .filter((item) => item.selected)
    .map((item) => item.value)
  const initialValue =
    defaultValue ??
    (selectedValues.length
      ? multiple
        ? selectedValues
        : selectedValues[0]
      : undefined)

  return (
    <label
      className={cx([
        "ui-select",
        size && `ui-${size}`,
        {
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        className,
      ])}
    >
      {label && (
        <span className="ui-label" id={labelId}>
          {label}
        </span>
      )}
      {description && (
        <span className="ui-start-text" id={descriptionId}>
          {description}
        </span>
      )}
      <span className="ui-field">
        <select
          {...rest}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          aria-labelledby={label ? labelId : rest["aria-labelledby"]}
          defaultValue={value === undefined ? initialValue : undefined}
          id={id}
          multiple={multiple}
          name={name ?? field?.name}
          value={value}
        >
          <button>{createElement("selectedcontent")}</button>
          <div className={cx(["ui-list", { "ui-dense": dense }])}>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
            {children}
          </div>
        </select>
        {prefix && <span className="ui-prefix">{prefix}</span>}
        {suffix && <span className="ui-suffix">{suffix}</span>}
        {header && <span className="ui-header">{header}</span>}
        {footer && <span className="ui-footer">{footer}</span>}
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
