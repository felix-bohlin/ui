"use client"

import { useMemo } from "react"
import { cx } from "../cx"
import { FieldGroupContext, useFieldGroupContext } from "./context.react"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function FieldGroup({
  className,
  name,
  orientation,
  children,
  ...rest
}: Props) {
  const parent = useFieldGroupContext()
  const context = useMemo<Context>(
    () => ({ name: name || parent?.name }),
    [name, parent?.name],
  )

  return (
    <FieldGroupContext value={context}>
      <div
        className={cx([
          "ui-field-group",
          orientation && orientation !== "auto" && `ui-${orientation}`,
          className,
        ])}
        {...rest}
      >
        {children}
      </div>
    </FieldGroupContext>
  )
}
