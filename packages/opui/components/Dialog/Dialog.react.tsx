"use client"

import { useId } from "react"
import { cx } from "../cx"
import { DialogContext } from "./context.react"
import { autoLabelledBy, createIds } from "../id"
import type { Props } from "./types.react"

export default function Dialog({
  className,
  closedby,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const titleId = createIds(uid, "dialog", rest.id)("title")
  const labelledBy = autoLabelledBy(rest, titleId)

  return (
    <DialogContext value={{ titleId: labelledBy }}>
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
