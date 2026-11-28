"use client"

import { useMemo } from "react"
import "../../elements/close-on-navigate.js"
import "../../elements/drawer-swipe.js"
import { defined } from "../attrs"
import { cx } from "../cx"
import { DrawerContext } from "./context.react"
import { autoLabelledBy } from "../id"
import { DEV, warnMissingId } from "../dev"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function Drawer({
  backdrop = "blurred",
  className,
  closedby = "any",
  closeOnNavigate,
  id,
  scrollLock,
  side = "inline-start",
  children,
  ...rest
}: Props) {
  const labelledBy = autoLabelledBy(rest, `${id}-title`)
  if (DEV) warnMissingId("Drawer", id)
  const attrs = defined(rest)
  const context = useMemo<Context>(
    () => ({ id, titleId: labelledBy }),
    [id, labelledBy],
  )

  return (
    <DrawerContext value={context}>
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
        data-close-on-navigate={closeOnNavigate ? "" : undefined}
        id={id}
        {...attrs}
      >
        {children}
      </dialog>
    </DrawerContext>
  )
}
