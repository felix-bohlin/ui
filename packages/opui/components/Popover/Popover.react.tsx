"use client"

import { useEffect, useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { PopoverContext } from "./context.react"
import { warnMissingId } from "../dev"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.react"

export default function Popover({
  align,
  className,
  closeOnNavigate,
  id,
  popover = "auto",
  side,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const titleId = `${id || `popover-${uid}`}-title`
  const labelledBy = autoLabelledBy(rest, titleId)
  warnMissingId("Popover", id)
  useEffect(() => {
    void import("../../elements/close-on-navigate.js")
  }, [])

  return (
    <PopoverContext value={{ id, titleId: labelledBy }}>
      <div
        aria-labelledby={labelledBy}
        className={cx([
          "ui-popover",
          { "ui-align-end": align === "end" },
          side && side !== "block-end" && `ui-${side}`,
          className,
        ])}
        data-close-on-navigate={closeOnNavigate ? "" : undefined}
        id={id}
        popover={popover === "auto" ? "" : popover}
        role="dialog"
        {...defined(rest)}
      >
        {children}
      </div>
    </PopoverContext>
  )
}
