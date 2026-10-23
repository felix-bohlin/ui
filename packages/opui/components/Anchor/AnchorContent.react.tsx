"use client"

import { cx } from "../cx"
import { useAnchorContext } from "./context.react"
import type { AnchorContentProps as Props } from "./types.react"

export default function AnchorContent({ className, ...rest }: Props) {
  const anchor = useAnchorContext()

  return (
    <span
      className={cx(["ui-floating", className])}
      id={anchor?.floatingId}
      popover={anchor?.popover}
      {...rest}
    />
  )
}
