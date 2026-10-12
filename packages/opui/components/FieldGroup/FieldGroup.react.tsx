"use client"

import { cx } from "../cx"
import { FieldContext, useFieldContext } from "./context.react"
import type { Props } from "./types.react"

export default function FieldGroup({
  className,
  direction,
  name,
  ...rest
}: Props) {
  const parent = useFieldContext()

  return (
    <FieldContext value={{ name: name || parent?.name }}>
      <div
        className={cx([
          "ui-field-group",
          direction && `ui-${direction}`,
          className,
        ])}
        {...rest}
      />
    </FieldContext>
  )
}
