"use client"

import { cx } from "../cx"
import { useDialogContext } from "./context.react"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({ className, id, ...rest }: Props) {
  const dialog = useDialogContext()

  return (
    <hgroup className={cx([className])} id={dialog?.headerId ?? id} {...rest} />
  )
}
