"use client"

import { cx } from "../cx"
import { usePopoverContext } from "./context.react"
import { warnReplacedId } from "../dev"
import type { PopoverTitleProps as Props } from "./types.react"

export default function PopoverTitle({
  as,
  className,
  id,
  children,
  ...rest
}: Props) {
  const popover = usePopoverContext()
  const Tag = as || "h2"
  warnReplacedId("PopoverTitle", "Popover", id, popover?.titleId)

  return (
    <Tag
      className={cx([className])}
      id={popover?.titleId ?? id}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
