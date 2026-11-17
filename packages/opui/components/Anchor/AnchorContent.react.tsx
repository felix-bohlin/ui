"use client"

import { cx } from "../cx"
import { useAnchorContext } from "./context.react"
import { warnReplacedAnchorAttributes } from "../dev"
import type { AnchorContentProps as Props } from "./types.react"

export default function AnchorContent({
  className,
  id,
  popover,
  children,
  ...rest
}: Props) {
  const anchor = useAnchorContext()
  warnReplacedAnchorAttributes(id, popover, anchor?.floatingId, anchor?.popover)

  return (
    <span
      className={cx(["ui-floating", className])}
      id={anchor?.floatingId ?? id}
      popover={anchor?.popover ?? popover}
      {...rest}
    >
      {children}
    </span>
  )
}
