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
  endText,
  footer,
  header,
  label,
  prefix,
  startText,
  suffix,
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
        {prefix && <span className="ui-prefix">{prefix}</span>}
        {suffix && <span className="ui-suffix">{suffix}</span>}
        {header && <span className="ui-header">{header}</span>}
        {footer && <span className="ui-footer">{footer}</span>}
      </span>
      {endText && <span className="ui-end-text">{endText}</span>}
      {children}
    </label>
  )
}
