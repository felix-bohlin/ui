"use client"

import { useId } from "react"
import { cx } from "../cx"
import { DrawerContext } from "./context.react"
import type { Props } from "./types.react"

export default function Drawer({
  backdrop = "blurred",
  className,
  closedby = "any",
  id,
  scrollLock = true,
  side = "inline-start",
  ...rest
}: Props) {
  const uid = useId()
  const drawerId = id || `drawer-${uid}`
  const titleId = `${drawerId}-heading`
  const labelledBy =
    rest["aria-label"] || rest["aria-labelledby"] ? undefined : titleId

  return (
    <DrawerContext value={{ id: drawerId, titleId: labelledBy }}>
      <dialog
        className={cx([
          "ui-drawer",
          side && `ui-${side}`,
          {
            "ui-backdrop-transparent": backdrop === "transparent",
            "ui-scroll-lock": scrollLock,
          },
          className,
        ])}
        aria-labelledby={labelledBy}
        closedby={closedby}
        id={drawerId}
        {...rest}
      />
    </DrawerContext>
  )
}
