"use client"

import { cx } from "../cx"
import { warnReplacedId } from "../dev"
import { useDialogContext } from "./context.react"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({ className, id, ...rest }: Props) {
  const dialog = useDialogContext()
  warnReplacedId("DialogHeader", "Dialog", id, dialog?.headerId)

  return (
    <hgroup className={cx([className])} id={dialog?.headerId ?? id} {...rest} />
  )
}
