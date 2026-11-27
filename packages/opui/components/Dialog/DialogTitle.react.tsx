"use client"

import { cx } from "../cx"
import { useDialogContext } from "./context.react"
import { DEV, warnReplacedId } from "../dev"
import type { DialogTitleProps as Props } from "./types.react"

export default function DialogTitle({
  className,
  id,
  children,
  ...rest
}: Props) {
  const dialog = useDialogContext()
  if (DEV) warnReplacedId("DialogTitle", "Dialog", id, dialog?.titleId)

  return (
    <h2 className={cx([className])} id={dialog?.titleId ?? id} {...rest}>
      {children}
    </h2>
  )
}
