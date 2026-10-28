"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import { warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Toaster({
  align,
  className,
  closeLabel,
  duration,
  id,
  side,
  ...rest
}: Props) {
  warnMissingId("Toaster", id)

  useEffect(() => {
    void import("../../elements/toaster.js")
  }, [])

  return (
    <opui-toaster
      className={cx([
        "ui-toaster",
        side && side !== "block-end" && `ui-${side}`,
        align && align !== "end" && `ui-align-${align}`,
        className,
      ])}
      close-label={closeLabel}
      duration={duration}
      id={id}
      {...rest}
    >
      <ol popover="manual"></ol>
      <div className="ui-sr-only" role="status"></div>
    </opui-toaster>
  )
}
