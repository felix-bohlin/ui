"use client"

import { cx } from "../cx"
import { useDrawerContext } from "./context.react"
import { warnReplacedId } from "../dev"
import type { DrawerTitleProps as Props } from "./types.react"

export default function DrawerTitle({
  className,
  id,
  children,
  ...rest
}: Props) {
  const drawer = useDrawerContext()
  warnReplacedId("DrawerTitle", "Drawer", id, drawer?.titleId)

  return (
    <h2 className={cx([className])} id={drawer?.titleId ?? id} {...rest}>
      {children}
    </h2>
  )
}
