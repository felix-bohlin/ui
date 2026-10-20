"use client"

import { createElement, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
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
  style,
  value,
  variant = "outlined",
  children,
  endText,
  footer,
  header,
  label,
  prefix,
  startText,
  suffix,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldGroupContext()
  const labelId = `select-label-${uid}`
  const startTextId = startText ? `start-text-${uid}` : undefined
  const endTextId = endText ? `end-text-${uid}` : undefined
  const headerId = header ? `header-${uid}` : undefined
  const footerId = footer ? `footer-${uid}` : undefined
  const describedBy = idRefs(
    headerId,
    startTextId,
    endTextId,
    footerId,
    rest["aria-describedby"],
  )

  const selectedValues = items
    .filter((item) => item.selected)
    .map((item) => String(item.value))
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
        {
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        size && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && (
        <span className="ui-label" id={labelId}>
          {label}
        </span>
      )}
      {startText && (
        <span className="ui-start-text" id={startTextId}>
          {startText}
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
        {header && (
          <span className="ui-header" id={headerId}>
            {header}
          </span>
        )}
        {footer && (
          <span className="ui-footer" id={footerId}>
            {footer}
          </span>
        )}
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </label>
  )
}
