"use client"

import { cx } from "../cx"
import { FieldGroupContext, useFieldGroupContext } from "./context.react"
import type { Props } from "./types.react"

export default function FieldGroup({
  className,
  direction,
  name,
  ...rest
}: Props) {
  const parent = useFieldGroupContext()

  return (
    <FieldGroupContext value={{ name: name || parent?.name }}>
      <div
        className={cx([
          "ui-field-group",
          direction && `ui-${direction}`,
          className,
        ])}
        {...rest}
      />
    </FieldGroupContext>
  )
}
