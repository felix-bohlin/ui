"use client"

import { cx } from "../cx"
import { warnReplacedId } from "../dev"
import { useDrawerContext } from "./context.react"
import type { DrawerTitleProps as Props } from "./types.react"

export default function DrawerTitle({ className, id, ...rest }: Props) {
  const drawer = useDrawerContext()
  warnReplacedId("DrawerTitle", "Drawer", id, drawer?.titleId)

  return <h2 className={cx([className])} id={drawer?.titleId ?? id} {...rest} />
}
