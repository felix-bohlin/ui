"use client"

import { cx } from "../cx"
import { FieldRootContext } from "../Field/context.react"
import { useFieldRootValue } from "../Field/root.react"
import type { CheckboxProps as Props } from "./types.react"

export default function Checkbox({
  children,
  className,
  error,
  size,
  spread,
  stack,
  ...rest
}: Props) {
  return (
    <FieldRootContext value={useFieldRootValue(children, error)}>
      <label
        className={cx([
          "ui-checkbox",
          size && `ui-${size}`,
          {
            "ui-stack": stack,
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
