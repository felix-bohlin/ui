"use client"

import "../../elements/copy.js"
import { defined } from "../attrs"
import { cx } from "../cx"
import { DEV, warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Copy({
  className,
  copiedLabel,
  failedLabel,
  id,
  children,
  ...rest
}: Props) {
  if (DEV) warnMissingId("Copy", id)

  return (
    <opui-copy
      className={cx(["ui-copy", className])}
      copied-label={copiedLabel}
      failed-label={failedLabel}
      id={id}
      {...defined(rest)}
    >
      {children}{" "}
      <span
        className="ui-sr-only"
        role="status"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />{" "}
      <span
        aria-hidden="true"
        className="ui-floating"
        popover=""
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
    </opui-copy>
  )
}
