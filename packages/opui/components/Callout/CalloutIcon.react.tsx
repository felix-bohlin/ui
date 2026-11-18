"use client"

import { defined } from "../attrs"
import { cx } from "../cx"
import { useCalloutContext } from "./context.react"
import type { CalloutIconProps as Props } from "./types.react"

export default function CalloutIcon({ className, ...rest }: Props) {
  const callout = useCalloutContext()
  const severity = callout?.severity

  return (
    severity &&
    severity !== "neutral" && (
      <svg
        aria-hidden="true"
        className={cx([className])}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        {...defined(rest)}
      />
    )
  )
}
