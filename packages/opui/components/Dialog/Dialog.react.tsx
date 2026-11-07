"use client"

import { useId } from "react"
import { cx } from "../cx"
import { DialogContext } from "./context.react"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.react"

export default function Dialog({
  className,
  closedby,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const titleId = `${rest.id ?? `dialog-${uid}`}-title`
  const labelledBy = autoLabelledBy(rest, titleId)

  return (
    <DialogContext value={{ id: rest.id ?? undefined, titleId: labelledBy }}>
      <dialog
        aria-labelledby={labelledBy}
        className={cx(["ui-dialog", "ui-elevated", className])}
        closedby={closedby}
        {...rest}
      >
        {children}
      </dialog>
    </DialogContext>
  )
}
