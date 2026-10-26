"use client"

import { useId } from "react"
import { cx } from "../cx"
import { autoLabelledBy } from "../id"
import { DialogContext } from "./context.react"
import type { Props } from "./types.react"

export default function Dialog({ className, closedby, ...rest }: Props) {
  const titleId = `dialog-title-${useId()}`
  const labelledBy = autoLabelledBy(rest, titleId)

  return (
    <DialogContext value={{ titleId: labelledBy }}>
      <dialog
        aria-labelledby={labelledBy}
        className={cx(["ui-dialog", "ui-elevated", className])}
        closedby={closedby}
        {...rest}
      />
    </DialogContext>
  )
}
