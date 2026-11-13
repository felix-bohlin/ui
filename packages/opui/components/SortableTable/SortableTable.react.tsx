"use client"

import { useCallback, useEffect } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useListener } from "../react"
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
  const listenerRef = useListener(ref, "sort", onSort)
  const rootRef = useCallback(
    (element: HTMLElement) => {
      const cleanup = listenerRef(element)
      element.removeAttribute("data-hydrating")
      return cleanup
    },
    [listenerRef],
  )

  useEffect(() => {
    void import("../../elements/sortable-table.js")
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
