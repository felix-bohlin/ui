"use client"

import { cx } from "../cx"
import { CalloutContext } from "./context.react"
import type { Props } from "./types.react"

export default function Callout({
  className,
  severity,
  variant,
  ...rest
}: Props) {
  return (
    <CalloutContext value={{ severity }}>
      <article
        className={cx([
          "ui-callout",
          variant && `ui-${variant}`,
          severity && `ui-${severity}`,
          className,
        ])}
        {...rest}
      />
    </CalloutContext>
  )
}
