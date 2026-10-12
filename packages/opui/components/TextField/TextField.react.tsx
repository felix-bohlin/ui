"use client"

import { cx } from "../cx"
import { FieldRootContext } from "../Field/context.react"
import { useFieldRootValue } from "../Field/root.react"
import type { Props } from "./types.react"

export default function TextField({
  autoFit,
  children,
  className,
  error,
  size,
  spread,
  variant,
  ...rest
}: Props) {
  return (
    <FieldRootContext value={useFieldRootValue(children, error)}>
      <label
        className={cx([
          "ui-text-field",
          size && `ui-${size}`,
          {
            "ui-auto-fit": autoFit,
            "ui-filled": variant === "filled",
            "ui-spread": spread,
          },
          className,
        ])}
        {...rest}
      >
        {children}
      </label>
    </FieldRootContext>
  )
}
