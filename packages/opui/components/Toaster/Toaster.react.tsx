"use client"

import "../../elements/toaster.js"
import { defined } from "../attrs"
import { cx } from "../cx"
import { warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Toaster({
  align,
  className,
  closeLabel,
  duration,
  id,
  limit,
  side,
  ...rest
}: Props) {
  warnMissingId("Toaster", id)

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
      limit={limit}
      {...defined(rest)}
    >
      <ol
        popover="manual"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
      <div
        className="ui-sr-only"
        role="status"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
      <div
        className="ui-sr-only"
        role="alert"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
    </opui-toaster>
  )
}
