"use client"

import { cx } from "../cx"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function TextField({
  autoFit,
  className,
  error,
  id,
  name,
  size,
  spread,
  style,
  type = "text",
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
        "ui-text-field",
        {
          "ui-auto-fit": autoFit,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        size && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      {label && <span className="ui-label">{label}</span>}
      {startText && <span className="ui-start-text">{startText}</span>}
      <span className="ui-field">
        <input
          {...rest}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          id={id}
          inputMode={
            rest.inputMode ?? (type === "numeric" ? "numeric" : undefined)
          }
          name={name ?? field?.name}
          pattern={rest.pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
          type={type === "numeric" ? "text" : type}
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
