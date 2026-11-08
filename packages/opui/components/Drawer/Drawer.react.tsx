"use client"

import { defined } from "../attrs"
import { cx } from "../cx"
import { DrawerContext } from "./context.react"
import { autoLabelledBy } from "../id"
import { warnMissingId } from "../dev"
import type { Props } from "./types.react"

export default function Drawer({
  backdrop = "blurred",
  className,
  closedby = "any",
  id,
  scrollLock,
  side = "inline-start",
  children,
  ...rest
}: Props) {
  const labelledBy = autoLabelledBy(rest, `${id}-heading`)
  warnMissingId("Drawer", id)

  return (
    <DrawerContext value={{ id, titleId: labelledBy }}>
      <dialog
        closedby={closedby}
        className={cx([
          "ui-drawer",
          {
            "ui-backdrop-transparent": backdrop === "transparent",
            "ui-scroll-lock": scrollLock,
          },
          side && side !== "inline-start" && `ui-${side}`,
          className,
        ])}
        aria-labelledby={labelledBy}
        id={id}
        {...defined(rest)}
      >
        {children}
      </dialog>
    </DrawerContext>
  )
}
