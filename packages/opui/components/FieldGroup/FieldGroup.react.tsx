"use client"

import { cx } from "../cx"
import { FieldGroupContext, useFieldGroupContext } from "./context.react"
import type { Props } from "./types.react"

export default function FieldGroup({
  className,
  name,
  orientation,
  ...rest
}: Props) {
  const parent = useFieldGroupContext()

  return (
    <FieldGroupContext value={{ name: name || parent?.name }}>
      <div
        className={cx([
          "ui-field-group",
          orientation && orientation !== "auto" && `ui-${orientation}`,
          className,
        ])}
        {...rest}
      />
    </FieldGroupContext>
  )
}
