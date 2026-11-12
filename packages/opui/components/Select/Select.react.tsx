"use client"

import { createElement, useId } from "react"
import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import { idRefs } from "../id"
import { initialValue } from "./selection"
import type { Props } from "./types.react"

export default function Select({
  autoFit,
  className,
  defaultValue,
  dense,
  error,
  hideLabel,
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
  bottom,
  end,
  endText,
  label,
  start,
  startText,
  top,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldGroupContext()
  const base = id || `select-${uid}`
  const selectId = label ? base : id
  const startTextId = startText ? `${base}-start-text` : undefined
  const endTextId = endText ? `${base}-end-text` : undefined
  const startId = start ? `${base}-start` : undefined
  const endId = end ? `${base}-end` : undefined
  const topId = top ? `${base}-top` : undefined
  const bottomId = bottom ? `${base}-bottom` : undefined
  const describedBy = idRefs(
    startTextId,
    topId,
    startId,
    endId,
    bottomId,
    endTextId,
    rest["aria-describedby"],
  )

  const selected = initialValue(items, multiple)

  return (
    <div
      className={cx([
        "ui-select",
        {
          "ui-auto-fit": autoFit,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && (
        <label
          className={hideLabel ? "ui-sr-only" : "ui-label"}
          htmlFor={selectId}
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
        <select
          {...rest}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          aria-labelledby={rest["aria-labelledby"]}
          defaultValue={
            value === undefined
              ? (defaultValue ??
                (Array.isArray(selected) ? selected.map(String) : selected))
              : undefined
          }
          id={selectId}
          multiple={multiple}
          name={name ?? field?.name}
          value={value}
        >
          <button>
            {createElement("selectedcontent", {
              dangerouslySetInnerHTML: { __html: "" },
              suppressHydrationWarning: true,
            })}
          </button>
          <div className={cx(["ui-list", { "ui-dense": dense }])}>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
            {children}
          </div>
        </select>
        {start && (
          <span className="ui-start" id={startId}>
            {start}
          </span>
        )}
        {end && (
          <span className="ui-end" id={endId}>
            {end}
          </span>
        )}
        {top && (
          <span className="ui-top" id={topId}>
            {top}
          </span>
        )}
        {bottom && (
          <span className="ui-bottom" id={bottomId}>
            {bottom}
          </span>
        )}
      </span>
      {endText && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
        </span>
      )}
    </div>
  )
}
