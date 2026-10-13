"use client"

import { cx } from "../cx"
import { useDrawerContext } from "./context.react"
import type { DrawerTitleProps as Props } from "./types.react"

export default function DrawerTitle({ className, id, ...rest }: Props) {
  const drawer = useDrawerContext()

  return <h2 className={cx([className])} id={drawer?.titleId ?? id} {...rest} />
}
