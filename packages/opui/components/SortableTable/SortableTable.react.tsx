"use client"

import { useEffect, useRef } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
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

  useEffect(() => {
    void import("../../elements/sortable-table.js")
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || !onSort) return
    const listener = (event: Event) => onSort(event as CustomEvent)
    element.addEventListener("sort", listener)
    return () => element.removeEventListener("sort", listener)
  }, [onSort])

  useEffect(() => {
    ref.current?.removeAttribute("data-hydrating")
  }, [])

  return (
    <opui-sortable-table
      ascending-label={ascendingLabel}
      className={cx(["ui-sortable-table", className])}
      data-hydrating=""
      descending-label={descendingLabel}
      ref={ref}
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
