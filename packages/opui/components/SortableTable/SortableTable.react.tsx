"use client"

import { useEffect, useRef } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useListener } from "../react"
import type { Props } from "./types.react"

export default function SortableTable({
  ascendingLabel,
  className,
  descendingLabel,
  onSort,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const rootRef = useListener(ref, "sort", onSort)

  useEffect(() => {
    void import("../../elements/sortable-table.js")
  }, [])

  useEffect(() => {
    ref.current?.removeAttribute("data-hydrating")
  }, [])

  return (
    <opui-sortable-table
      ascending-label={ascendingLabel}
      className={cx(["ui-sortable-table", className])}
      data-hydrating=""
      descending-label={descendingLabel}
      ref={rootRef}
      {...defined(rest)}
    >
      {children}
      <span
        className="ui-sr-only"
        role="status"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
    </opui-sortable-table>
  )
}
