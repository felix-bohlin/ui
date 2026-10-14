"use client"

import { useId } from "react"
import { cx } from "../cx"
import { useFieldContext } from "../FieldGroup/context.react"
import type { Props } from "./types.react"

export default function Textarea({
  "aria-describedby": ariaDescribedBy,
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
  description,
  endText,
  footer,
  header,
  label,
  prefix,
  suffix,
  supportingText,
  ...rest
}: Props) {
  const uid = useId()
  const field = useFieldContext()
  const endTextId = endText || supportingText ? `end-text-${uid}` : undefined
  const describedBy =
    [endTextId, ariaDescribedBy].filter(Boolean).join(" ") || undefined

  return (
    <label
      className={cx([
        "ui-textarea",
        size && `ui-${size}`,
        {
          "ui-auto-fit": autoFit,
          "ui-filled": variant === "filled",
          "ui-spread": spread,
        },
        className,
      ])}
      style={style}
    >
      {label && <span className="ui-label">{label}</span>}
      {description && <span className="ui-start-text">{description}</span>}
      <span className="ui-field">
        <textarea
          {...rest}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : rest["aria-invalid"]}
          id={id}
          name={name ?? field?.name}
        />
        {prefix && <span className="ui-prefix">{prefix}</span>}
        {suffix && <span className="ui-suffix">{suffix}</span>}
        {header && <span className="ui-header">{header}</span>}
        {footer && <span className="ui-footer">{footer}</span>}
      </span>
      {(endText || supportingText) && (
        <span className="ui-end-text" id={endTextId}>
          {endText}
          {supportingText}
        </span>
      )}
      {children}
    </label>
  )
}
