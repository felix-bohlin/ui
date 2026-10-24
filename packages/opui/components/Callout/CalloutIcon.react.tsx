"use client"

import { cx } from "../cx"
import { useCalloutContext } from "./context.react"
import { iconFor } from "./icons"
import type { CalloutIconProps as Props } from "./types.react"

export default function CalloutIcon({ className, ...rest }: Props) {
  const icon = iconFor(useCalloutContext()?.severity)

  if (!icon) return null

  return (
    <svg
      aria-hidden="true"
      className={cx([className])}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox={icon.viewBox}
      {...rest}
    >
      <path fill="currentColor" d={icon.d} />
    </svg>
  )
}
