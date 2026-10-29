"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import { warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Copy({
  className,
  copiedLabel,
  failedLabel,
  id,
  children,
  ...rest
}: Props) {
  warnMissingId("Copy", id)

  useEffect(() => {
    void import("../../elements/copy.js")
  }, [])

  return (
    <opui-copy
      className={cx(["ui-copy", className])}
      copied-label={copiedLabel}
      failed-label={failedLabel}
      id={id}
      {...rest}
    >
      {children}
      <span className="ui-sr-only" role="status"></span>
      <span aria-hidden="true" className="ui-floating" popover=""></span>
    </opui-copy>
  )
}
