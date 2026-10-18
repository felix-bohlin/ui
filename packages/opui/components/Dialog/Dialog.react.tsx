"use client"

import { useId } from "react"
import { cx } from "../cx"
import { autoLabelledBy } from "../id"
import { DialogContext } from "./context.react"
import type { Props } from "./types.react"

export default function Dialog({ className, closedby, ...rest }: Props) {
  const headerId = `dialog-header-${useId()}`
  const labelledBy = autoLabelledBy(rest, headerId)

  return (
    <DialogContext value={{ headerId: labelledBy }}>
      <dialog
        aria-labelledby={labelledBy}
        className={cx(["ui-dialog ui-card ui-elevated", className])}
        closedby={closedby}
        {...rest}
      />
    </DialogContext>
  )
}
