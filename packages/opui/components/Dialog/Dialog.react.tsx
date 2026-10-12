"use client"

import { useId } from "react"
import { cx } from "../cx"
import { DialogContext } from "./context.react"
import type { Props } from "./types.react"

export default function Dialog({ className, closedby, ...rest }: Props) {
  const headerId = `dialog-header-${useId()}`
  const labelledBy =
    rest["aria-label"] || rest["aria-labelledby"] ? undefined : headerId

  return (
    <DialogContext value={{ headerId }}>
      <dialog
        aria-labelledby={labelledBy}
        className={cx(["ui-dialog ui-card ui-elevated", className])}
        closedby={closedby}
        {...rest}
      />
    </DialogContext>
  )
}
