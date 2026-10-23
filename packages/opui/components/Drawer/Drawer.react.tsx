"use client"

import { cx } from "../cx"
import { autoLabelledBy } from "../id"
import { DrawerContext } from "./context.react"
import type { Props } from "./types.react"

export default function Drawer({
  backdrop = "blurred",
  className,
  closedby = "any",
  id,
  scrollLock,
  side = "inline-start",
  ...rest
}: Props) {
  const labelledBy = autoLabelledBy(rest, `${id}-heading`)

  return (
    <DrawerContext value={{ id, titleId: labelledBy }}>
      <dialog
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
        closedby={closedby}
        id={id}
        {...rest}
      />
    </DrawerContext>
  )
}
