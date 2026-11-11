"use client"

import { cx } from "../cx"
import { usePopoverContext } from "./context.react"
import { warnReplacedId } from "../dev"
import type { PopoverTitleProps as Props } from "./types.react"

export default function PopoverTitle({
  className,
  id,
  children,
  ...rest
}: Props) {
  const popover = usePopoverContext()
  warnReplacedId("PopoverTitle", "Popover", id, popover?.titleId)

  return (
    <h2 className={cx([className])} id={popover?.titleId ?? id} {...rest}>
      {children}
    </h2>
  )
}
