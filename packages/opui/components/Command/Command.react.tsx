"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Command({
  className,
  emptyLabel,
  filter,
  variant,
  children,
  ...rest
}: Props) {
  useEffect(() => {
    void import("../../elements/command.js")
  }, [])

  return (
    <opui-command
      className={cx([
        "ui-command",
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      empty-label={emptyLabel}
      filter={filter && filter !== "auto" ? filter : undefined}
      {...rest}
    >
      {children}
      <p role="status"></p>
    </opui-command>
  )
}
