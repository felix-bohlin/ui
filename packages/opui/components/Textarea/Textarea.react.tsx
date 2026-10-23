"use client"

import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function Textarea({
  autoFit,
  className,
  error,
  id,
  name,
  size,
  spread,
  style,
  variant,
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
  const field = useFieldGroupContext()

  return (
    <label
      className={cx([
        "ui-textarea",
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
      {label && <span className="ui-label">{label}</span>}
      {startText && <span className="ui-start-text">{startText}</span>}
      <span className="ui-field">
        <textarea
          {...rest}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          id={id}
          name={name ?? field?.name}
        />
        {start && <span className="ui-start">{start}</span>}
        {end && <span className="ui-end">{end}</span>}
        {top && <span className="ui-top">{top}</span>}
        {bottom && <span className="ui-bottom">{bottom}</span>}
      </span>
      {endText && <span className="ui-end-text">{endText}</span>}
      {children}
    </label>
  )
}
