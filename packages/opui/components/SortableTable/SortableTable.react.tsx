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

  return (
    <opui-sortable-table
      ascending-label={ascendingLabel}
      className={cx(["ui-sortable-table", className])}
      descending-label={descendingLabel}
      ref={ref}
      {...defined(rest)}
    />
  )
}
