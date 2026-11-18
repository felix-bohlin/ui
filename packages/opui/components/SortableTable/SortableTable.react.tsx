"use client"

import { useEffect } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useHydrated, useListener } from "../react"
import type { Props } from "./types.react"

export default function SortableTable({
  ascendingLabel,
  className,
  descendingLabel,
  onSort,
  ref,
  children,
  ...rest
}: Props) {
  const rootRef = useHydrated(useListener(ref, "sort", onSort))
  useEffect(() => {
    void import("../../elements/sortable-table.js")
  }, [])

  return (
    <opui-sortable-table
      ascending-label={ascendingLabel}
      className={cx(["ui-sortable-table", className])}
      descending-label={descendingLabel}
      data-hydrating=""
      ref={rootRef}
      {...defined(rest)}
    >
      {children}{" "}
      <span
        className="ui-sr-only"
        role="status"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
    </opui-sortable-table>
  )
}
