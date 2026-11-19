"use client"

import { useId, useMemo } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { DialogContext } from "./context.react"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function Dialog({
  className,
  closedby,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const titleId = `${rest.id || `dialog-${uid}`}-title`
  const labelledBy = autoLabelledBy(rest, titleId)
  const attrs = defined(rest)
  const context = useMemo<Context>(
    () => ({ id: rest.id || undefined, titleId: labelledBy }),
    [labelledBy, rest.id],
  )

  return (
    <DialogContext value={context}>
      <dialog
        aria-labelledby={labelledBy}
        className={cx(["ui-dialog", "ui-elevated", className])}
        closedby={closedby}
        {...attrs}
      >
        {children}
      </dialog>
    </DialogContext>
  )
}
